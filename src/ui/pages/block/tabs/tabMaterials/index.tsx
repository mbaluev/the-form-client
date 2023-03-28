import React, { useState } from 'react';
import { classNames } from '@utils/classNames';
import { Form, FormSection } from '@components/form';
import { Accordion } from '@components/accordion';
import { Toolbar } from '@components/toolbar';
import { Alert } from '@components/alert';
import { IconButton } from '@components/iconButton';
import DownloadIcon from '@mui/icons-material/Download';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button } from '@components/button';

const MOCK_EXPAND = false;
const MOCK_DOCUMENTS = [
  {
    name: 'File 1',
    description: 'Description',
    expanded: MOCK_EXPAND,
  },
  {
    name: 'File 2',
    description: 'Description',
    expanded: MOCK_EXPAND,
  },
  {
    name: 'File 3',
    description: 'Description',
    expanded: MOCK_EXPAND,
  },
  {
    name: 'File 4',
    description: 'Description',
    expanded: MOCK_EXPAND,
  },
  {
    name: 'File 5',
    description: 'Description',
    expanded: MOCK_EXPAND,
  },
];

export const TabMaterials = () => {
  const cls = classNames('tab-materials');
  const [expand, setExpand] = useState<boolean>(MOCK_EXPAND);

  const [files, setFiles] = useState<any>(MOCK_DOCUMENTS);
  const expandHandler = (index: number) => {
    const newDocuments = [...files];
    let expandAll = true;
    newDocuments.forEach((file, i) => {
      if (i === index) file.expanded = !file.expanded;
      if (file.expanded === false) expandAll = false;
    });
    setFiles(newDocuments);
    setExpand(expandAll);
  };
  const expandAllHandler = () => {
    const newDocuments = [...files];
    newDocuments.forEach((file) => (file.expanded = !expand));
    setFiles(newDocuments);
    setExpand(!expand);
  };

  const buttons = [
    <IconButton
      tooltip={expand ? 'Collapse all' : 'Expand all'}
      onClick={expandAllHandler}
    >
      {expand ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
    </IconButton>,
  ];
  const footerButtons = [
    <Button
      size="medium"
      variant="text"
      color="blue"
      startIcon={<DownloadIcon />}
      children="Download"
    />,
  ];

  return (
    <Form className={cls}>
      <Alert
        type="success"
        message="All files downloaded"
        shadow={false}
        variant="outlined"
      />
      <Toolbar itemsLeft={buttons} />
      <FormSection cols={3}>
        {files.map((file: any, index: number) => (
          <Accordion
            key={index}
            title={file.name}
            footerButtons={footerButtons}
            expanded={file.expanded}
            onExpand={() => expandHandler(index)}
          >
            {file.description}
          </Accordion>
        ))}
      </FormSection>
    </Form>
  );
};
