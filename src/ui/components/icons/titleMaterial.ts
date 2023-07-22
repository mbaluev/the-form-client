import { IMaterialUserDTO } from '@model/entities/material';

export const titleMaterial = (userMaterial?: IMaterialUserDTO | null) => {
  let title = 'New';
  if (userMaterial?.complete) title = 'Downloaded';
  return title;
};
