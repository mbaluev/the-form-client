import React, { ChangeEvent, useEffect } from 'react';
import { Modal } from '@components/modal';
import { Form, FormField, FormSection } from '@components/form';
import {
  CheckboxFieldControl,
  SelectFieldControl,
  TextFieldControl,
} from '@components/fields';
import { IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { Skeleton } from '@components/skeleton';
import { IQuestionViewModel } from '@viewModel/modules/question/interface';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { Add, Delete } from '@mui/icons-material';
import { IconButton } from '@components/iconButton';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const DialogQuestion = observer((props: IProps) => {
  const { isOpen, onClose, onCancel, onSubmit } = props;

  const {
    isModalLoading,
    modalData,
    changeModalField,
    getModalError,
    hasModalErrors,
    hasModalChanges,
    option,
    setOption,
    addOption,
    addOptionCorrect,
    removeOption,
    removeOptionCorrect,
  } = useViewModel<IQuestionViewModel>(VIEW_MODEL.Question);

  const { list: blocks, data: block } = useViewModel<IBlockViewModel>(
    VIEW_MODEL.Block
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeModalField(e.target.name, e.target.value);
  };
  const Label = () => {
    if (isModalLoading) {
      return <Skeleton width={200} />;
    }
    if (!modalData || (modalData && !modalData.title)) {
      return <React.Fragment>New question</React.Fragment>;
    }
    return <React.Fragment>{modalData.title}</React.Fragment>;
  };
  const footerButtons: IButtonProps[] = [
    {
      children: 'Cancel',
      variant: 'outlined',
      color: 'grey',
      onClick: onCancel,
    },
    {
      children: 'Save',
      variant: 'contained',
      color: 'blue',
      onClick: onSubmit,
      disabled: hasModalErrors || !hasModalChanges,
    },
  ];

  const changeOptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };
  const removeOptionHandler = (id: string) => {
    removeOption(id);
    removeOptionCorrect(id);
  };
  const changeOptionCorrectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addOptionCorrect(e.target.name);
    } else {
      removeOptionCorrect(e.target.name);
    }
  };

  useEffect(() => {
    if (block) changeModalField('blockId', block.id);
  }, [isOpen]);

  return (
    <Modal
      className="dialog-question"
      title={<Label />}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={1}>
        <FormSection>
          <FormField title="Block">
            <SelectFieldControl
              name="blockId"
              value={modalData?.blockId}
              items={blocks?.map((d) => {
                return {
                  value: d.id,
                  label: d.title,
                };
              })}
              error={Boolean(getModalError('blockId'))}
              helperText={getModalError('blockId')?.message}
              disabled
            />
          </FormField>
          <FormField title="Title">
            <TextFieldControl
              name="title"
              value={modalData?.title}
              onChange={changeHandler}
              error={Boolean(getModalError('title'))}
              helperText={getModalError('title')?.message}
            />
          </FormField>
          <FormField
            title="Options"
            actions={[
              <IconButton onClick={addOption}>
                <Add />
              </IconButton>,
            ]}
          >
            <TextFieldControl
              name="option"
              placeholder="Text option"
              value={option}
              onChange={changeOptionHandler}
              error={Boolean(getModalError('options'))}
              helperText={getModalError('options')?.message}
            />
          </FormField>
          {modalData?.options?.map((item, index) => {
            const checked = modalData?.optionsCorrectId
              ? modalData?.optionsCorrectId.includes(item.id)
              : false;
            const deleteOptionHandler = () => removeOptionHandler(item.id);
            return (
              <FormField
                key={index}
                actions={[
                  <IconButton onClick={deleteOptionHandler}>
                    <Delete />
                  </IconButton>,
                ]}
              >
                <CheckboxFieldControl
                  label={item.title}
                  value={checked}
                  name={item.id}
                  onChange={changeOptionCorrectHandler}
                  error={Boolean(getModalError('optionsCorrectId'))}
                />
              </FormField>
            );
          })}
        </FormSection>
      </Form>
    </Modal>
  );
});
