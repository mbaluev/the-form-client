import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { ITaskUserMessageDTO } from '@model/task';

export interface ITaskHistoryViewModel
  extends IBaseCardViewModel<ITaskUserMessageDTO> {
  download: (id: string, filename: string) => Promise<void>;
}
