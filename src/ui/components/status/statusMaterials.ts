import { IBlockUserDTO } from '@model/entities/block';

export const statusMaterials = (userBlock?: IBlockUserDTO | null) => {
  let title = 'Materials: disabled';
  if (userBlock?.enable && !userBlock?.completeMaterials) title = 'Materials: in progress';
  if (userBlock?.completeMaterials) title = 'Materials: complete';
  return title;
};
