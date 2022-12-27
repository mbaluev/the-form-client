import React, { useEffect } from 'react';
import { classNames } from '@utils/classNames';
import { Form, FormSection } from '@components/form';
import { Accordion } from '@components/accordion';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import AddIcon from '@mui/icons-material/Add';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { TextFieldControl } from '@components/fields';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { ITaskViewModel } from '@viewModel/modules/task/interface';
import { Loader } from '@components/loader';
import { NoData } from '@components/noData';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { IDocumentDTO } from '@model/document';
import { Button } from '@components/button';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { DialogTask } from '@ui/dialogs/dialogTask';
import './index.scss';

export const TabHomework = observer(() => {
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
  } = useViewModel<ITaskViewModel>(VIEW_MODEL.Task);

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

  const cls = classNames('tab-homework-block');

  return (
    <div className={cls}>
      <Loader loading={isListLoading} />
      <Toolbar itemsLeft={itemsLeft} itemsRight={itemsRight} />
      <Form>
        {!hasListFiltered && !isListLoading && (
          <NoData icon={<DoNotDisturbIcon />} message="No tasks found" />
        )}
        {hasListFiltered && (
          <FormSection cols={1}>
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
      <DialogTask
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
        title="Delete task"
        message="Are you sure you want to delete task?"
      />
    </div>
  );
});
