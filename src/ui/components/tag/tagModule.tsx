import { IModuleUserDTO } from '@model/entities/module';
import { ITagProps, Tag } from '@components/tag';
import { statusModule } from '@ui/components/status/statusModule';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const TagModule = (props: IProps) => {
  const { userModule } = props;
  const tag: ITagProps = {
    tag: statusModule(userModule),
    color: 'blue',
  };
  if (userModule?.complete) {
    tag.color = 'green';
  }
  if (!userModule?.enable) {
    tag.color = 'grey-dark';
  }
  return <Tag {...tag} />;
};
