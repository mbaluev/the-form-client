import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleBlock } from '@ui/pages/module/[id]/moduleBlock';
import { observer } from 'mobx-react';

export const ModuleBlocks = observer(() => {
  const { data: module } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  return (
    <div className="cols_4">
      {module?.blocks?.map((block, index) => {
        return <ModuleBlock key={index} block={block} />;
      })}
    </div>
  );
});
