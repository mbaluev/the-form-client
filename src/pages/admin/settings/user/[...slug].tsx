import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { PageUsers } from '@ui/pages/admin/settings/user/index/page';
import { PageUser } from '@ui/pages/admin/settings/user/item/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { FormProvider, useForm } from 'react-hook-form';
import { IUserDTO } from '@model/entities/user';
import { DEFAULT_USER } from '@model/entities/user/default';

const User = (props: any) => {
  const router = useRouter();
  const id = router.query.slug?.[0] as string;

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_USERS.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_USERS.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_USER.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_USER.path, query: router.query },
    },
  ];

  const { getData: getUser, setData: setUser, data: user } = useUserItemStore();
  useEffect(() => {
    if (id) getUser(id);
    return () => setUser();
  }, [id]);

  const methods = useForm<IUserDTO>({ mode: 'all' });
  useEffect(() => {
    methods.reset(user || DEFAULT_USER);
  }, [user]);

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

export default observer(User);
