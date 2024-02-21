import { IMaterialDTO } from '@model/entities/material/index';

export const DEFAULT_MATERIAL: IMaterialDTO = {
  id: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  blockId: '',
  documentId: '',
};
