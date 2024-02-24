import { IBlockUserDTO } from '@model/entities/block';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IBlockBaseStore extends IBaseCardStore<IBlockUserDTO> {
  tab: BlockTabNames;
  changeTab: (value: BlockTabNames) => void;
  refresh: () => Promise<void>;
}
