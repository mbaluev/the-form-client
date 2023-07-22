import { IBlockUserDTO } from '@model/entities/block';

export const titleTask = (
  userBlock?: IBlockUserDTO | null,
  admin?: boolean
) => {
  let title = 'Homework: disabled';
  if (userBlock?.enable && !userBlock?.completeTasks)
    title = 'Homework: in progress';
  if (userBlock?.completeTasks) title = 'Homework: complete';
  if (!admin && userBlock?.sentTasks === true) title = 'Homework: answered';
  if (!admin && userBlock?.sentTasks === false) title = 'Homework: incoming';
  if (admin && userBlock?.sentTasks === true) title = 'Homework: incoming';
  if (admin && userBlock?.sentTasks === false) title = 'Homework: answered';
  return title;
};
