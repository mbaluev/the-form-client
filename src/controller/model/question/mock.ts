import { IQuestionDTO } from '@model/question/index';

export const MOCK_QUESTIONS: IQuestionDTO[] = [
  {
    id: '1',
    blockId: '1',
    title: 'Question 1',
    options: [
      {
        id: '1',
        title: 'answer 1',
      },
      {
        id: '2',
        title: 'answer 2',
      },
    ],
    optionsCorrectId: ['1'],
  },
  {
    id: '2',
    blockId: '1',
    title: 'Question 2',
    options: [
      {
        id: '1',
        title: 'answer 1',
      },
      {
        id: '2',
        title: 'answer 2',
      },
    ],
  },
];
