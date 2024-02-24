import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IQuestionItemStore from '@store/modules/entities/question/item/interface';

export const useQuestionItemStore = () => {
  const container = useContainer();
  return container.get<IQuestionItemStore>(STORE.QuestionItem);
};
