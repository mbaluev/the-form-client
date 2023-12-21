import { MasterAnon } from '@ui/masters/masterAnon';
import { ReactElement } from 'react';
import { ErrorCode } from '@ui/layout/page/errorCode';

const Custom401 = () => {
  return <ErrorCode code="401" description="Unauthorized" />;
};

Custom401.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom401;
