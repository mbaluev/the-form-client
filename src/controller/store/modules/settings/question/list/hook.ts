import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IQuestionSettingsListStore from '@store/modules/settings/question/list/interface';

export const useQuestionSettingsListStore = () => {
  const container = useContainer();
  return container.get<IQuestionSettingsListStore>(STORE.QuestionSettingsList);
};
