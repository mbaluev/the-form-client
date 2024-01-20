import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockUserDTO } from '@model/entities/block';
import { action, makeObservable, observable } from 'mobx';
import { BaseCardStore } from '@store/modules/base/card';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';
import type IBlockBaseStore from '@store/modules/entities/block/_/base/interface';
import type IBlockService from '@service/modules/entities/block/interface';

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

  tab = BlockTabNames.materials;

  setTab = (value: BlockTabNames) => (this.tab = value);

  changeTab = (value: BlockTabNames) => {
    this.setTab(value);
  };

  refresh = async () => {
    if (this.data?.id) await this.getData(this.data.id);
  };
}
