import type IBaseListStore from '@store/modules/base/list/interface';
import { IMaterialDTO } from '@model/entities/material';

export default interface IMaterialListStore extends IBaseListStore<IMaterialDTO> {}
