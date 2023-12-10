import { MasterAnon } from '@ui/masters/masterAnon';
import { ErrorPage } from '@ui/errors/errorPage';
import { ReactElement } from 'react';

const Custom404 = () => {
  return <ErrorPage code="404" description="Not found" />;
};

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom404;
