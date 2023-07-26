import { IModuleUserDTO } from '@model/entities/module';
import { ITagProps, Tag } from '@components/tag';
import { statusModules } from '@ui/components/status/statusModules';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
}

export const TagModules = (props: IProps) => {
  const { userModules } = props;
  const tag: ITagProps = {
    tag: statusModules(userModules),
    color: 'grey-dark',
  };
  userModules?.forEach((userModule) => {
    if (userModule?.enable && !userModule.complete) tag.color = 'blue';
  });
  let complete = false;
  if (userModules && userModules.length > 0) {
    complete = userModules?.reduce(
      (prev: boolean, userModule: IModuleUserDTO) =>
        prev && userModule.complete,
      true
    );
  }
  if (complete) {
    tag.color = 'green';
  }
  return <Tag {...tag} />;
};
