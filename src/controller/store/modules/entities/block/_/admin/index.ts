/* eslint-disable sonarjs/cognitive-complexity */
import _ from 'lodash';
import { injectable } from 'inversify';
import { IBlockUserDTO } from '@model/entities/block';
import { ParsedUrlQuery } from 'querystring';
import { BlockBaseStore } from '@store/modules/entities/block/_/base';
import type IBlockAdminStore from '@store/modules/entities/block/_/admin/interface';

@injectable()
export class BlockAdminStore extends BlockBaseStore implements IBlockAdminStore {
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
              item.user?.firstname.toLowerCase().includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.lastname')) {
          result =
            result ||
            (item.user?.lastname !== undefined &&
              item.user?.lastname !== null &&
              item.user?.lastname.toLowerCase().includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.username')) {
          result =
            result ||
            (item.user?.username !== undefined &&
              item.user?.username !== null &&
              item.user?.username.toLowerCase().includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'block.title')) {
          result =
            result ||
            (item.block?.title !== undefined &&
              item.block?.title !== null &&
              item.block?.title.toLowerCase().includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'block.name')) {
          result =
            result ||
            (item.block?.name !== undefined &&
              item.block?.name !== null &&
              item.block?.name.toLowerCase().includes((query.filter as string).toLowerCase()));
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

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    await this.clearData();
    this.setDataLoading(true);
    try {
      const data = await this.serviceBlock.getBlockAdmin(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  getList = async (query?: ParsedUrlQuery) => {
    await this.clearList();
    this.setListLoading(true);
    try {
      const data = await this.serviceBlock.getBlocksAdmin(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };
}
