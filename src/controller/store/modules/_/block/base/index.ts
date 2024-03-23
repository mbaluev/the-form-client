import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockUserDTO } from '@model/entities/block';
import { action, makeObservable, observable } from 'mobx';
import { BaseCardStore } from '@store/modules/base/card';
import type IBlockBaseStore from '@store/modules/_/block/base/interface';
import type IBlockService from '@service/modules/entities/block/interface';
import { ROUTES } from '@settings/routes';

@injectable()
export class BlockBaseStore extends BaseCardStore<IBlockUserDTO> implements IBlockBaseStore {
  @inject(SERVICE.Block) protected serviceBlock!: IBlockService;

  constructor() {
    super();
    makeObservable(this, {
      tab: observable,
      setTab: action,
      changeTab: action,
      refresh: action,
    });
  }

  tab = ROUTES.SCHOOL_BLOCK.tabs.keys.materials;

  setTab = (value: string) => (this.tab = value);

  changeTab = (value: string) => {
    this.setTab(value);
  };

  refresh = async () => {
    if (this.data?.id) await this.getData(this.data.id);
  };
}
