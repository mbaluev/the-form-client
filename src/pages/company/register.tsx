import { CustomHead } from '@ui/layout/customHead';
import { Page } from '@ui/layout/page';
import { TBreadCrumb } from '@ui/layout/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { observer } from 'mobx-react';
import { Quick } from '@ui/pages/company/register/quick';
import { Title } from '@ui/pages/company/register/title';
import { Content } from '@ui/pages/company/register/content';
import { FormProvider, useForm } from 'react-hook-form';
import { DefaultCompany } from '@model/onboard/company/mock';
import { MasterAuth } from '@ui/masters/masterAuth';

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
      label: ROUTES.HOME.label,
      url: ROUTES.HOME.path,
    },
    {
      label: ROUTES.COMPANY_REGISTER.label,
      url: ROUTES.COMPANY_REGISTER.path,
    },
  ];
  const methods = useForm({ mode: 'all', defaultValues: DefaultCompany });
  return (
    <MasterAuth>
      <FormProvider {...methods}>
        <Page
          breadCrumbs={breadCrumbs}
          title={<Title />}
          quickFilter={<Quick />}
          {...props}
        >
          <CustomHead />
          <Content />
        </Page>
      </FormProvider>
    </MasterAuth>
  );
};

export default observer(Index);
