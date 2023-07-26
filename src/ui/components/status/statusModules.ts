import { IModuleUserDTO } from '@model/entities/module';

export const statusModules = (userModules?: IModuleUserDTO[] | null) => {
  let title = 'Modules disabled';
  userModules?.forEach((userModule) => {
    if (userModule?.enable && !userModule.complete) title = 'In progress';
  });
  let complete = false;
  if (userModules && userModules.length > 0) {
    complete = userModules?.reduce(
      (prev: boolean, userModule: IModuleUserDTO) =>
        prev && userModule.complete,
      true
    );
  }
  if (complete) {
    title = 'Complete';
  }
  return title;
};
