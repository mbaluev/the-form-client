import { MasterAnon } from '@ui/masters/masterAnon';
import { ErrorCode } from '@ui/layout/page/errorCode';
import { ReactElement } from 'react';

const Custom404 = () => {
  return <ErrorCode code="404" description="Not found" />;
};

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom404;
