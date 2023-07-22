import { IBlockUserDTO } from '@model/entities/block';

export const titleTasks = (
  userBlock?: IBlockUserDTO | null,
  admin?: boolean
) => {
  let title = 'Homework: disabled';
  if (userBlock?.enable && !userBlock?.completeTasks) {
    title = 'Homework: in progress';
  }
  if (!admin && userBlock?.sentTasksAdmin === false) {
    title = 'Homework: answered';
  }
  if (!admin && userBlock?.sentTasksAdmin === true) {
    title = 'Homework: incoming';
  }
  if (admin && userBlock?.sentTasksUser === true) {
    title = 'Homework: incoming';
  }
  if (admin && userBlock?.sentTasksUser === false) {
    title = 'Homework: answered';
  }
  if (userBlock?.completeTasks) {
    title = 'Homework: complete';
  }
  return title;
};
