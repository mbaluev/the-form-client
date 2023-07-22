import { IBlockUserDTO } from '@model/entities/block';

export const titleBlock = (userBlock?: IBlockUserDTO | null) => {
  let title = 'Disabled';
  if (userBlock?.enable && !userBlock.complete) title = 'In progress';
  if (userBlock?.enable && userBlock.complete) title = 'Complete';
  if (userBlock?.enable && userBlock.complete && userBlock.errorQuestions)
    title = 'Complete with errors';
  if (
    userBlock?.enable &&
    userBlock.complete &&
    userBlock.errorQuestions &&
    userBlock.commentQuestions
  )
    title = 'Complete with comments';
  return title;
};
