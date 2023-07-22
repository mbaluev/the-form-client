import { ITaskUserDTO } from '@model/entities/task';

export const titleTask = (userTask?: ITaskUserDTO | null) => {
  let title = 'Todo';
  if (userTask?.sent === false) title = 'Income';
  if (userTask?.sent === true) title = 'Sent';
  if (userTask?.complete) title = 'Complete';
  return title;
};
