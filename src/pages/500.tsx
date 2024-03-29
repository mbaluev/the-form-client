import { MasterAnon } from '@ui/masters/masterAnon';
import { ErrorCode } from '@ui/layout/page/errorCode';
import { ReactElement } from 'react';

const Custom500 = () => {
  return <ErrorCode code="500" description="Internal server error" />;
};

Custom500.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom500;
