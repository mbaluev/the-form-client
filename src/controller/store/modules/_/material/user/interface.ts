import type IMaterialBaseStore from '@store/modules/_/material/base/interface';

export default interface IMaterialUserStore extends IMaterialBaseStore {
  update: (id: string, complete: boolean) => Promise<boolean>;
}
