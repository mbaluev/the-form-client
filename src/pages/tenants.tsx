import { CustomHead } from '@ui/layout/customHead';
import { Page } from '@ui/layout/page';
import { TBreadCrumb } from '@ui/layout/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { observer } from 'mobx-react';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Title } from '@ui/pages/company/view/title';
import { Quick } from '@ui/pages/company/view/quick';
import { Tabs } from '@ui/pages/company/view/tabs';

export const getServerSideProps: GetServerSideProps<any> = async (props) => {
  // get locales
  const { locale } = props;
  const localeInitial = locale ?? 'en';
  const localeNamespaces = ['common', 'menu', 'company'];
  const localeLang = localeInitial.split('-')[0];
  const locales = await serverSideTranslations(localeLang, localeNamespaces);
  return { props: { ...locales } };
};

const Index = (props: any) => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      url: ROUTES.HOME.path,
      label: ROUTES.HOME.label,
    },
    {
      url: ROUTES.TENANTS.path,
      label: ROUTES.TENANTS.label,
    },
  ];
  return (
    <MasterAuth>
      <Page
        breadCrumbs={breadCrumbs}
        title={<Title />}
        quickFilter={<Quick />}
        {...props}
      >
        <CustomHead />
        <Tabs />
      </Page>
    </MasterAuth>
  );
};

export default observer(Index);
