import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleBlock } from '@ui/pages/school/module/[id]/moduleBlock';
import { observer } from 'mobx-react';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

export const ModuleBlocks = observer(() => {
  const { data: userModule } = useViewModel<IModuleUserViewModel>(VIEW_MODEL.ModuleUser);
  return (
    <div className="cols_4">
      {userModule?.userBlocks?.map((userBlock, index) => {
        return <ModuleBlock key={index} userBlock={userBlock} />;
      })}
    </div>
  );
});
