import { IBlockUserDTO } from '@model/entities/block';
import { IBaseCardViewModel } from '@viewModel/modules/base/baseCard/interfaces';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';

export interface IBlockBaseViewModel extends IBaseCardViewModel<IBlockUserDTO> {
  tab: BlockTabNames;
  changeTab: (value: BlockTabNames) => void;
  refresh: () => Promise<void>;
}
