import { MasterAnon } from '@ui/masters/masterAnon';
import { ErrorCode } from '@ui/layout/page/errorCode';
import { ReactElement } from 'react';

const Custom403 = () => {
  return <ErrorCode code="403" description="Access denied" />;
};

Custom403.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom403;
