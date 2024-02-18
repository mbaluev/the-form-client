import type IMaterialBaseStore from '@store/modules/entities/material/_/base/interface';

export default interface IMaterialUserStore extends IMaterialBaseStore {
  update: (id: string, complete: boolean) => Promise<boolean>;
}
