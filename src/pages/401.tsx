import { MasterAnon } from '@ui/masters/masterAnon';
import { ErrorPage } from '@ui/errors/errorPage';
import { ReactElement } from 'react';

const Custom401 = () => {
  return <ErrorPage code="401" description="Unauthorized" />;
};

Custom401.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom401;
