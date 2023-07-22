/* eslint-disable sonarjs/cognitive-complexity */
import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockUserDTO } from '@model/entities/block';
import { BlockService } from 'controller/service/modules/entities/block';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { FilterViewModel } from '@viewModel/modules/common/filter';
import { action, makeObservable, observable } from 'mobx';
import { BlockTabNames } from '@ui/pages/school/block/blockTabs';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';

@injectable()
export class BlockAdminViewModel
  extends BaseCardViewModel<IBlockUserDTO>
  implements IBlockAdminViewModel
{
  @inject(SERVICE.Block) protected serviceBlock!: BlockService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.Filter) protected filters!: FilterViewModel;

  constructor() {
    super();
    makeObservable(this, {
      tab: observable,
      setTab: action,
      changeTab: action,
    });
  }

  tab = BlockTabNames.materials;

  setTab = (value: BlockTabNames) => (this.tab = value);

  changeTab = (value: BlockTabNames) => {
    this.setTab(value);
  };

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: IBlockUserDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'user.firstname')) {
          result =
            result ||
            (item.user?.firstname !== undefined &&
              item.user?.firstname !== null &&
              item.user?.firstname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.lastname')) {
          result =
            result ||
            (item.user?.lastname !== undefined &&
              item.user?.lastname !== null &&
              item.user?.lastname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.username')) {
          result =
            result ||
            (item.user?.username !== undefined &&
              item.user?.username !== null &&
              item.user?.username
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'block.title')) {
          result =
            result ||
            (item.block?.title !== undefined &&
              item.block?.title !== null &&
              item.block?.title
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'block.name')) {
          result =
            result ||
            (item.block?.name !== undefined &&
              item.block?.name !== null &&
              item.block?.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'block.module.title')) {
          result =
            result ||
            (item.block?.module?.title !== undefined &&
              item.block?.module?.title !== null &&
              item.block?.module?.title
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'block.module.name')) {
          result =
            result ||
            (item.block?.module?.name !== undefined &&
              item.block?.module?.name !== null &&
              item.block?.module?.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  getData = async (id: string) => {
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceBlock.getBlockAdmin(id, undefined, token);
      this.setData(data);
    } catch (err) {
    } finally {
    }
  };
}
