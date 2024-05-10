import { IModuleUserDTO } from '@model/entities/module';

export const statusModule = (userModule?: IModuleUserDTO | null) => {
  let title = 'Disabled';
  if (userModule?.enable && !userModule.complete) title = 'In progress';
  if (userModule?.enable && userModule.complete) title = 'Complete';
  return title;
};
