import { IModuleUserDTO } from 'controller/model/entities/module';
import { ITagProps, Tag } from '@components/tag';
import { titleModule } from '@ui/components/statuses/titleModule';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const StatusModule = (props: IProps) => {
  const { userModule } = props;
  const tag: ITagProps = {
    tag: titleModule(userModule),
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
