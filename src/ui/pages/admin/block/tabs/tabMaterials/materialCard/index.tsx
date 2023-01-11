import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Accordion } from '@components/accordion';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@components/button';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialViewModel } from '@viewModel/modules/material/interface';
import { IMaterialDTO } from '@model/material';

interface IProps {
  material: IMaterialDTO;
}
export const MaterialCard = observer((props: IProps) => {
  const { material } = props;
  const { modalOpen, addDeleteId, deleteOpen, expandData, download } =
    useViewModel<IMaterialViewModel>(VIEW_MODEL.Material);

  const expandHandler = () => expandData(material);
  const openDocumentHandler = () => modalOpen(material.id);
  const openDeleteHandler = () => {
    addDeleteId(material.id);
    deleteOpen();
  };
  const downloadHandler = () => {
    download(material.document.file.id, material.document.file.name);
  };

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
      title={material.document.name}
      footerButtons={footerButtons}
      expanded={material.expanded}
      onExpand={expandHandler}
    >
      {material.document.description}
    </Accordion>
  );
});
