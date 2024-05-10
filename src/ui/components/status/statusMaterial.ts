import { IMaterialUserDTO } from '@model/entities/material';

export const statusMaterial = (userMaterial?: IMaterialUserDTO | null) => {
  let title = 'New';
  if (userMaterial?.complete) title = 'Downloaded';
  return title;
};
