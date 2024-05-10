import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IQuestionSettingsItemStore from '@store/modules/settings/question/item/interface';

export const useQuestionSettingsItemStore = () => {
  const container = useContainer();
  return container.get<IQuestionSettingsItemStore>(STORE.QuestionSettingsItem);
};
