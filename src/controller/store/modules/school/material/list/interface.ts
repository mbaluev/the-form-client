import type IBaseListStore from '@store/modules/base/list/interface';
import { IMaterialUserDTO } from '@model/entities/material';

export default interface IMaterialSchoolListStore extends IBaseListStore<IMaterialUserDTO> {
  update: (id: string, complete: boolean) => Promise<boolean>;
}
