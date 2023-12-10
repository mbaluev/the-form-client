import { MasterAnon } from '@ui/masters/masterAnon';
import { ErrorPage } from '@ui/errors/errorPage';
import { ReactElement } from 'react';

const Custom500 = () => {
  return <ErrorPage code="500" description="Internal server error" />;
};

Custom500.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom500;
