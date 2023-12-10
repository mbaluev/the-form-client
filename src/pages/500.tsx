import { MasterAnon } from '@ui/masters/masterAnon';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ErrorPage } from '@ui/errors/errorPage';
import { ReactElement } from 'react';

export const getStaticProps: GetStaticProps<any> = async (props) => {
  // get locales
  const { locale } = props;
  const localeInitial = locale ?? 'en';
  const localeNamespaces = ['common', 'menu'];
  const localeLang = localeInitial.split('-')[0];
  const locales = await serverSideTranslations(localeLang, localeNamespaces);
  return { props: { ...locales } };
};

const Custom500 = () => {
  const { t } = useTranslation();
  return <ErrorPage code="500" description={t('common:error-500')} />;
};

Custom500.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom500;
