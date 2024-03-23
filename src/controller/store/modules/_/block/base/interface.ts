import { IBlockUserDTO } from '@model/entities/block';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IBlockBaseStore extends IBaseCardStore<IBlockUserDTO> {
  tab: string;
  changeTab: (value: string) => void;
  refresh: () => Promise<void>;
}
