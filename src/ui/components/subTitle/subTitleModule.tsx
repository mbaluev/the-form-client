import { observer } from 'mobx-react';
import { TagModule } from '@ui/components/tag/tagModule';
import { IModuleUserDTO } from '@model/entities/module';
import { Fragment } from 'react';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const SubTitleModule = observer((props: IProps) => {
  const { userModule } = props;
  return (
    <Fragment>
      <TagModule userModule={userModule} />
      {userModule?.module?.title}
    </Fragment>
  );
});
