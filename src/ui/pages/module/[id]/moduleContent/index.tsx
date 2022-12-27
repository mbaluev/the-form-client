import React from 'react';
import { classNames } from '@utils/classNames';
import { ModuleBlocks } from '@ui/pages/module/[id]/moduleBlocks';
import { Page403 } from '@ui/pages/errors/403';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import './index.scss';

export const ModuleContent = observer(() => {
  const { data: module } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
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
