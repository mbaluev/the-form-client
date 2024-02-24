import type IBaseListStore from '@store/modules/base/list/interface';
import { IMaterialDTO } from '@model/entities/material';

export default interface IMaterialSettingsListStore extends IBaseListStore<IMaterialDTO> {}
