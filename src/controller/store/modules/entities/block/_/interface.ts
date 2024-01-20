import { IBlockDTO } from '@model/entities/block';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IBlockStore extends IBaseCardStore<IBlockDTO> {
  blockData?: IBlockDTO | null;
  setBlockData: (data?: IBlockDTO | null) => void;
  clearBlockData: () => Promise<void>;
}
