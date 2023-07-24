import { IBlockUserDTO } from '@model/entities/block';

export const statusTasks = (
  userBlock?: IBlockUserDTO | null,
  admin?: boolean
) => {
  let title = 'Homework: disabled';
  if (userBlock?.enable && !userBlock?.completeTasks) {
    title = 'Homework: in progress';
  }

  if (
    (!admin &&
      (userBlock?.sentTasksAdmin === true ||
        userBlock?.sentTasksUser === false)) ||
    (admin &&
      (userBlock?.sentTasksUser === true ||
        userBlock?.sentTasksAdmin === false))
  ) {
    title = 'Homework: incoming';
  }

  if (
    (admin &&
      (userBlock?.sentTasksUser === false ||
        userBlock?.sentTasksAdmin === true)) ||
    (!admin &&
      (userBlock?.sentTasksAdmin === false ||
        userBlock?.sentTasksUser === true))
  ) {
    title = 'Homework: answered';
  }

  if (userBlock?.completeTasks) {
    title = 'Homework: complete';
  }
  return title;
};
