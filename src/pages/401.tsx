import { MasterAnon } from '@ui/masters/masterAnon';
import { PageStatus } from '@ui/layout/page/pageStatus';
import { ReactElement } from 'react';

const Custom401 = () => {
  return <PageStatus code="401" description="Unauthorized" />;
};

Custom401.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom401;
