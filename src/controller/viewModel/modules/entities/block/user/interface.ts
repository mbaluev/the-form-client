import { IBlockUserDTO } from '@model/entities/block';
import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { BlockTabNames } from '@ui/pages/school/block/blockTabs';

export interface IBlockUserViewModel extends IBaseCardViewModel<IBlockUserDTO> {
  tab: BlockTabNames;
  changeTab: (value: BlockTabNames) => void;
}
