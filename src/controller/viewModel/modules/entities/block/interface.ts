import { IBlockDTO } from '@model/entities/block';
import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';

export interface IBlockViewModel extends IBaseCardViewModel<IBlockDTO> {
  blockData?: IBlockDTO | null;
  setBlockData: (data?: IBlockDTO | null) => void;
  clearBlockData: () => Promise<void>;
}
