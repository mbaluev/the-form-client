import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IMaterialUserDTO } from '@model/entities/material';
import type IMaterialSchoolItemStore from '@store/modules/school/material/item/interface';
import type IMaterialService from '@service/modules/entities/material/interface';

@injectable()
export class MaterialSchoolItemStore
  extends BaseCardStore<IMaterialUserDTO>
  implements IMaterialSchoolItemStore
{
  @inject(SERVICE.Material) private materialService!: IMaterialService;

  // --- override

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.materialService.getMaterialUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
