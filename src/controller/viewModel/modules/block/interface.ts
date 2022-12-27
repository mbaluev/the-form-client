import { IBlockDTO } from '@model/block';
import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';

export interface IBlockViewModel extends IBaseCardViewModel<IBlockDTO> {
  blockData?: IBlockDTO | null;
  setBlockData: (data?: IBlockDTO | null) => void;
  clearBlockData: () => Promise<void>;
}
