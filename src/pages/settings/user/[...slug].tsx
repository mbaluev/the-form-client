import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { PageUsers } from '@ui/pages/settings/user/index/page';
import { PageUser } from '@ui/pages/settings/user/item/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useUserSettingsItemStore } from '@store/modules/settings/user/item/hook';
import { FormProvider, useForm } from 'react-hook-form';
import { IUserDTO } from '@model/entities/user';
import { DEFAULT_USER } from '@model/entities/user/default';
import { Skeleton } from '@mui/material';

const User = (props: any) => {
  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const {
    getData: getUser,
    setData: setUser,
    data: user,
    isDataLoading: loadingUser,
  } = useUserSettingsItemStore();

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
      label: loadingUser ? (
        <Skeleton width={100} />
      ) : user ? (
        user.username
      ) : (
        ROUTES.SETTINGS_USER.label
      ),
      url: { pathname: ROUTES.SETTINGS_USER.path, query: router.query },
    },
  ];

  useEffect(() => {
    if (id) getUser(id);
    return () => setUser();
  }, [id]);

  const methods = useForm<IUserDTO>({ mode: 'all', defaultValues: DEFAULT_USER });
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
