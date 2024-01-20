import type IBaseCardStore from '@store/modules/base/card/interfaces';
import { IBlockDTO } from '@model/entities/block';

export default interface IBlockItemStore extends IBaseCardStore<IBlockDTO> {}
