import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleBlock } from '@ui/pages/module/[id]/moduleBlock';
import { observer } from 'mobx-react';
import { IModuleUserViewModel } from '@viewModel/modules/module/user/interface';

export const ModuleBlocks = observer(() => {
  const { data: module } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  return (
    <div className="cols_4">
      {module?.blocks?.map((block, index) => {
        return <ModuleBlock key={index} block={block} />;
      })}
    </div>
  );
});
