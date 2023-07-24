import { IModuleUserDTO } from '@model/entities/module';

export const statusModules = (userModules?: IModuleUserDTO[] | null) => {
  let title = 'Disabled';
  userModules?.forEach((userModule) => {
    if (userModule?.enable && !userModule.complete) title = 'In progress';
  });
  const complete = userModules?.reduce(
    (prev: boolean, userModule: IModuleUserDTO) => prev && userModule.complete,
    true
  );
  if (complete) {
    title = 'Complete';
  }
  return title;
};
