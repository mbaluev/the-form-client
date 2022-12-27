import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { classNames } from '@utils/classNames';
import { IconButton } from '@components/iconButton';
import { Form, FormSection } from '@components/form';
import { Toolbar } from '@components/toolbar';
import { Accordion } from '@components/accordion';
import DownloadIcon from '@mui/icons-material/Download';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Button } from '@components/button';
import { DialogMaterial } from '@ui/dialogs/dialogMaterial';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialViewModel } from '@viewModel/modules/material/interface';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { IDocumentDTO } from '@model/document';
import { Loader } from '@components/loader';
import { NoData } from '@components/noData';
import { TextFieldControl } from '@components/fields';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './index.scss';

export const TabMaterials = observer(() => {
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
    modalOpen,
    modalClose,
    modalSubmit,
    isDeleteOpen,
    isDeleteLoading,
    addDeleteId,
    deleteOpen,
    deleteClose,
    deleteSubmit,
    isListExpanded,
    expandData,
    expandList,
    download,
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

  const cls = classNames('tab-materials-block');

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
            {listFiltered?.map((file: IDocumentDTO, index: number) => {
              const expandHandler = () => expandData(file);
              const openDocumentHandler = () => modalOpen(file.id);
              const openDeleteHandler = () => {
                addDeleteId(file.id);
                deleteOpen();
              };
              const downloadHandler = () => download(file.file.path);
              const footerButtons = [
                <Button
                  size="medium"
                  variant="text"
                  color="blue"
                  children="Download"
                  startIcon={<DownloadIcon />}
                  onClick={downloadHandler}
                />,
                <IconButton
                  color="blue"
                  tooltip="Edit"
                  tooltipPlacement="bottom"
                  onClick={openDocumentHandler}
                >
                  <EditIcon />
                </IconButton>,
                <IconButton
                  color="red"
                  tooltip="Delete"
                  tooltipPlacement="bottom"
                  onClick={openDeleteHandler}
                >
                  <DeleteIcon />
                </IconButton>,
              ];
              return (
                <Accordion
                  key={index}
                  title={file.name}
                  footerButtons={footerButtons}
                  expanded={file.expanded}
                  onExpand={expandHandler}
                >
                  {file.description}
                </Accordion>
              );
            })}
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
