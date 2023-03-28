import { IBlockUserDTO } from '@model/block';
import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';

export interface IBlockViewModel extends IBaseCardViewModel<IBlockUserDTO> {
  blockData?: IBlockUserDTO | null;
  setBlockData: (data?: IBlockUserDTO | null) => void;
  clearBlockData: () => Promise<void>;
}
