import { Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { useCompanyViewStore } from '@store/modules/onboard/company/view/useCompanyViewStore';
import { Content } from '@ui/pages/company/view/content';
import { Welcome } from '@ui/pages/company/view/welcome';
import { TenantsList } from '@ui/pages/tenants/list';

export const Tabs = observer(() => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isLoading, isRemoving, company } = useCompanyViewStore();

  let active = router.pathname;
  if (router.pathname === ROUTES.COMPANY_REMOVE.path) {
    active = ROUTES.COMPANY.path;
  }

  const tabs = [
    {
      key: ROUTES.COMPANY.path,
      label: t(ROUTES.COMPANY.label),
      component: isLoading ? <TabSkeleton /> : <Content />,
    },
    {
      key: ROUTES.TENANTS.path,
      label: t(ROUTES.TENANTS.label),
      component: isLoading ? <TabSkeleton /> : <TenantsList />,
    },
  ];
  const handleChange = async (value: string) => {
    await router.push({ pathname: value });
  };

  if (isLoading) return <TabSkeleton />;
  if (!company) return <Welcome />;

  return (
    <MuiTabs
      active={active}
      tabs={tabs}
      onChange={handleChange}
      loading={isRemoving}
    />
  );
});
