import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IQuestionSchoolListStore from '@store/modules/school/question/list/interface';

export const useQuestionSchoolListStore = () => {
  const container = useContainer();
  return container.get<IQuestionSchoolListStore>(STORE.QuestionSchoolList);
};
