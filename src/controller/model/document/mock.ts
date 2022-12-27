import { IDocumentDTO } from '@model/document/index';

export const MOCK_DOCUMENT: IDocumentDTO = {
  id: '1',
  blockId: '1',
  documentType: 'material',
  name: 'file-name',
  description: 'file-description-1',
  file: {
    id: '1',
    path: 'http://file-url.com',
    name: 'file-url',
    size: 500,
  },
};

export const MOCK_DOCUMENTS: IDocumentDTO[] = [
  { ...MOCK_DOCUMENT },
  {
    ...MOCK_DOCUMENT,
    id: '2',
    name: 'file-name-2',
    description: 'file-description-2',
  },
  {
    ...MOCK_DOCUMENT,
    id: '3',
    name: 'task-1',
    description: 'task-description-1',
    documentType: 'task',
  },
  {
    ...MOCK_DOCUMENT,
    id: '4',
    name: 'task-2',
    description: 'task-description-2',
    documentType: 'task',
  },
];
