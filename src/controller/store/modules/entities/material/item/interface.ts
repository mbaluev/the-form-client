import type IBaseCardStore from '@store/modules/base/card/interfaces';
import { IMaterialDTO } from '@model/entities/material';

export default interface IMaterialItemStore extends IBaseCardStore<IMaterialDTO> {}
