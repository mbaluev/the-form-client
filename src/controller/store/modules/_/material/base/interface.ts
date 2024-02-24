import { IMaterialUserDTO } from '@model/entities/material';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IMaterialBaseStore extends IBaseCardStore<IMaterialUserDTO> {
  download: (id: string, filename: string) => Promise<void>;
}
