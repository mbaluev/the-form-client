import type IBaseListStore from '@store/modules/base/list/interface';
import { IBlockDTO } from '@model/entities/block';

export default interface IBlockListStore extends IBaseListStore<IBlockDTO> {}
