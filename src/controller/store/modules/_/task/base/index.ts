/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import _ from 'lodash';
import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { ITaskUserDTO } from '@model/entities/task';
import { BaseCardStore } from '@store/modules/base/card';
import type ITaskBaseStore from '@store/modules/settings/task/_/base/interface';
import type ITaskService from '@service/modules/entities/task/interface';
import type IFileService from '@service/modules/common/file/interface';

@injectable()
export class TaskBaseStore extends BaseCardStore<ITaskUserDTO> implements ITaskBaseStore {
  @inject(SERVICE.Task) protected serviceTask!: ITaskService;

  @inject(SERVICE.File) protected serviceFile!: IFileService;

  constructor() {
    super();
    makeObservable(this, {
      download: action,
    });
  }

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: ITaskUserDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'task.document.name')) {
          result =
            result ||
            (item.task?.document?.name !== undefined &&
              item.task?.document?.name !== null &&
              item.task?.document?.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'task.document.description')) {
          result =
            result ||
            (item.task?.document?.description !== undefined &&
              item.task?.document?.description !== null &&
              item.task?.document?.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'task.document.url')) {
          result =
            result ||
            (item.task?.document?.url !== undefined &&
              item.task?.document?.url !== null &&
              item.task?.document?.url
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'task.document.file.name')) {
          result =
            result ||
            (item.task?.document?.file.name !== undefined &&
              item.task?.document?.file.name !== null &&
              item.task?.document?.file.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  // --- actions

  download = async (id: string, filename: string) => {
    try {
      await this.serviceFile.downloadFile(id, filename);
    } catch (err) {
    } finally {
    }
  };
}
