import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { classNames } from '@utils/classNames';
import { IconButton } from '@components/iconButton';
import { Form, FormSection } from '@components/form';
import { Toolbar } from '@components/toolbar';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import AddIcon from '@mui/icons-material/Add';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CloseIcon from '@mui/icons-material/Close';
import { DialogMaterial } from '@ui/dialogs/dialogMaterial';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialViewModel } from '@viewModel/modules/material/interface';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { Loader } from '@components/loader';
import { NoData } from '@components/noData';
import { TextFieldControl } from '@components/fields';
import { InputAdornment } from '@mui/material';
import { IMaterialDTO } from '@model/material';
import { MaterialCard } from '@ui/pages/admin/block/tabs/tabMaterials/materialCard';
import './index.scss';

export const MaterialCards = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const {
    isListLoading,
    listFiltered,
    hasListFiltered,
    filter,
    setFilter,
    getList,
    isModalOpen,
    modalNew,
    modalClose,
    modalSubmit,
    isDeleteOpen,
    isDeleteLoading,
    deleteClose,
    deleteSubmit,
    isListExpanded,
    expandList,
  } = useViewModel<IMaterialViewModel>(VIEW_MODEL.Material);

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const searchClearHandler = () => {
    setFilter(undefined);
  };

  const itemsLeft: JSX.Element[] = [
    <TextFieldControl
      name="testSearch"
      placeholder="Search"
      value={filter}
      onChange={searchChangeHandler}
      style={{ flex: '1 1 auto' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={searchClearHandler}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />,
  ];
  const itemsRight = [
    <IconButton
      tooltip={isListExpanded ? 'Collapse all' : 'Expand all'}
      onClick={expandList}
    >
      {isListExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
    </IconButton>,
    <IconButton tooltip="New file" onClick={modalNew}>
      <AddIcon />
    </IconButton>,
  ];

  useEffect(() => {
    if (block) getList();
  }, [block]);

  const cls = classNames('materials-cards');

  return (
    <div className={cls}>
      <Loader loading={isListLoading} />
      <Toolbar itemsLeft={itemsLeft} itemsRight={itemsRight} />
      <Form>
        {!hasListFiltered && !isListLoading && (
          <NoData icon={<DoNotDisturbIcon />} message="No materials found" />
        )}
        {hasListFiltered && (
          <FormSection cols={3}>
            {listFiltered?.map((material: IMaterialDTO, index: number) => (
              <MaterialCard material={material} key={index} />
            ))}
          </FormSection>
        )}
      </Form>
      <DialogMaterial
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={modalSubmit}
        options={{ multiple: false }}
      />
      <DialogConfirm
        isOpen={isDeleteOpen}
        isLoading={isDeleteLoading}
        onClose={deleteClose}
        onCancel={deleteClose}
        onSubmit={deleteSubmit}
        title="Delete material"
        message="Are you sure you want to delete material?"
      />
    </div>
  );
});
