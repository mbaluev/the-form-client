import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { PageUsers } from '@ui/pages/admin/settings/user/index/page';
import { PageUser } from '@ui/pages/admin/settings/user/item/page';
import { FormProvider, useForm } from 'react-hook-form';
import { IUserDTO } from '@model/entities/user';
import { DEFAULT_USER } from '@model/entities/user/default';

const Users = (props: any) => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_USERS.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_USERS.path },
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

export default Users;
