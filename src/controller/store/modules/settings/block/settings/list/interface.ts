import type IBaseListStore from '@store/modules/base/list/interface';
import { IBlockDTO } from '@model/entities/block';

export default interface IBlockSettingsListStore extends IBaseListStore<IBlockDTO> {}
