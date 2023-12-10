import { MasterAnon } from '@ui/masters/masterAnon';
import { ErrorPage } from '@ui/errors/errorPage';
import { ReactElement } from 'react';

const Custom403 = () => {
  return <ErrorPage code="403" description="Access denied" />;
};

Custom403.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom403;
