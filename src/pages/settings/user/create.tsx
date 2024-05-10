import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { PageUsers } from '@ui/pages/settings/user/index/page';
import { PageUser } from '@ui/pages/settings/user/item/page';
import { FormProvider, useForm } from 'react-hook-form';
import { IUserDTO } from '@model/entities/user';
import { DEFAULT_USER } from '@model/entities/user/default';

const UserCreate = (props: any) => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.SETTINGS_USERS.label,
      url: { pathname: ROUTES.SETTINGS_USERS.path },
    },
    {
      label: ROUTES.SETTINGS_USER_CREATE.label,
      url: { pathname: ROUTES.SETTINGS_USER_CREATE.path },
    },
  ];
  const methods = useForm<IUserDTO>({ mode: 'all', defaultValues: DEFAULT_USER });
  return (
    <MasterAuth>
      <FormProvider {...methods}>
        <Page {...props} breadCrumbs={breadCrumbs} right={<PageUser />}>
          <PageUsers />
        </Page>
      </FormProvider>
    </MasterAuth>
  );
};

export default UserCreate;
