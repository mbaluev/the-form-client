import React from 'react';
import { observer } from 'mobx-react';
import { TagModule } from '@ui/components/tag/tagModule';
import { IModuleUserDTO } from '@model/entities/module';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const SubTitleModule = observer((props: IProps) => {
  const { userModule } = props;
  return (
    <React.Fragment>
      <TagModule userModule={userModule} />
      {userModule?.module?.title}
    </React.Fragment>
  );
});
