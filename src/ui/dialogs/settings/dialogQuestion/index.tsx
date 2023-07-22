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
import { IQuestionViewModel } from '@viewModel/modules/entities/question/interface';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
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
    removeOption,
    changeOptionCorrect,
    hasOption,
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
  };
  const changeOptionCorrectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeOptionCorrect(e.target.name, e.target.checked);
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
          <FormField title="Position">
            <TextFieldControl
              name="position"
              value={modalData?.position}
              onChange={changeHandler}
              error={Boolean(getModalError('position'))}
              helperText={getModalError('position')?.message}
              type="number"
            />
          </FormField>
          <FormField
            title="Question options"
            actions={[
              <IconButton
                onClick={addOption}
                disabled={!hasOption}
                tooltip="Add option"
              >
                <Add />
              </IconButton>,
            ]}
          >
            <TextFieldControl
              multiline
              minRows={5}
              name="option"
              placeholder="Text option"
              value={option}
              onChange={changeOptionHandler}
              error={Boolean(getModalError('questionOptions'))}
              helperText={getModalError('questionOptions')?.message}
            />
          </FormField>
          {modalData?.questionOptions?.map((item, index) => {
            const deleteOptionHandler = () => removeOptionHandler(item.id);
            return (
              <FormField
                key={index}
                actions={[
                  <IconButton
                    onClick={deleteOptionHandler}
                    tooltip="Remove option"
                  >
                    <Delete />
                  </IconButton>,
                ]}
              >
                <CheckboxFieldControl
                  label={item.title}
                  value={item.correct}
                  name={item.id}
                  onChange={changeOptionCorrectHandler}
                  error={Boolean(getModalError('questionOptions.[].correct'))}
                />
              </FormField>
            );
          })}
        </FormSection>
      </Form>
    </Modal>
  );
});
