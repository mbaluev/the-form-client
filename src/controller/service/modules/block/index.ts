import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IBlockService } from '@service/modules/block/interface';
import { IBlockDTO } from '@model/block';
import { BLOCKS } from '@model/block/mock';
import { ParsedUrlQuery } from 'querystring';
import { guid } from '@utils/guid/guid';

@injectable()
export class BlockService implements IBlockService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  mockFilterByQuery =
    (query?: ParsedUrlQuery) =>
    (block: IBlockDTO): boolean => {
      return query
        ? (query.search
            ? block.title
                .toLowerCase()
                .includes((query.search as string).toLowerCase()) ||
              block.name
                .toLowerCase()
                .includes((query.search as string).toLowerCase())
            : true) &&
            (query.moduleId ? block.moduleId === query.moduleId : true)
        : true;
    };

  getBlocks = async (
    query?: ParsedUrlQuery
  ): Promise<IBlockDTO[] | undefined> => {
    const blocks = [...BLOCKS].filter(this.mockFilterByQuery(query));
    return new Promise<IBlockDTO[] | undefined>((resolve) => {
      setTimeout(() => resolve(blocks), 0);
    });
  };

  getBlocksByModuleId = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IBlockDTO[] | undefined> => {
    const blocks = [...BLOCKS].filter((block) => block.moduleId === id);
    const result = blocks.filter(this.mockFilterByQuery(query));
    return new Promise<IBlockDTO[] | undefined>((resolve) => {
      setTimeout(() => resolve(result), 0);
    });
  };

  getBlock = async (
    id?: string,
    query?: ParsedUrlQuery
  ): Promise<IBlockDTO | undefined> => {
    const block = BLOCKS.find((item) => item.id === id);
    const display = block && this.mockFilterByQuery(query)(block);
    const result = display ? block : undefined;
    return new Promise<IBlockDTO | undefined>((resolve) => {
      setTimeout(() => resolve(result), 0);
    });
  };

  saveBlock = async (data: IBlockDTO) => {
    if (!data.id) data.id = guid();
    return new Promise<IBlockDTO>((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };

  deleteBlocks = async (ids: string[]) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };
}
