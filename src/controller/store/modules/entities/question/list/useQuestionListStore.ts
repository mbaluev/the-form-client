import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IQuestionListStore from '@store/modules/entities/question/list/interface';

export const useQuestionListStore = () => {
  const container = useContainer();
  return container.get<IQuestionListStore>(STORE.QuestionList);
};
