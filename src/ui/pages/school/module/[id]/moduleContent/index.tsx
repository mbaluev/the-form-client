import React from 'react';
import { classNames } from '@utils/classNames';
import { ModuleBlocks } from '@ui/pages/school/module/[id]/moduleBlocks';
import { Page403 } from '@ui/pages/errors/403';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { IModuleUserViewModel } from '@viewModel/modules/module/user/interface';
import './index.scss';

export const ModuleContent = observer(() => {
  const { data: module } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  const cls = classNames('module-content');
  if (!module) return <Loader loading relative />;
  return module.enable ? (
    <div className={cls}>
      <ModuleBlocks />
    </div>
  ) : (
    <Page403 />
  );
});
