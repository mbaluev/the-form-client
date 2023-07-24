import { ITaskUserDTO } from '@model/entities/task';

export const statusTask = (userTask?: ITaskUserDTO | null, admin?: boolean) => {
  let title = 'Todo';
  if (
    (admin && userTask?.sent === true) ||
    (!admin && userTask?.sent === false)
  )
    title = 'Income';
  if (
    (admin && userTask?.sent === false) ||
    (!admin && userTask?.sent === true)
  )
    title = 'Sent';
  if (userTask?.complete) title = 'Complete';
  return title;
};
