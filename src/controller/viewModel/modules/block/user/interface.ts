import { IBlockUserDTO } from '@model/block';
import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { BlockTabNames } from '@ui/pages/block/blockTabs';

export interface IBlockUserViewModel extends IBaseCardViewModel<IBlockUserDTO> {
  tab: BlockTabNames;
  changeTab: (value: BlockTabNames) => void;
}
