import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IQuestionSchoolItemStore from '@store/modules/school/question/item/interface';

export const useQuestionSchoolItemStore = () => {
  const container = useContainer();
  return container.get<IQuestionSchoolItemStore>(STORE.QuestionSchoolItem);
};
