import { MasterAnon } from '@ui/masters/masterAnon';
import { ReactElement } from 'react';
import { ErrorIcon } from '@ui/layout/page/errorIcon';

const Custom402 = () => {
  return (
    <ErrorIcon status="success" title="Success" message="Sign up success. Wait for confirmation." />
  );
};

Custom402.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom402;
