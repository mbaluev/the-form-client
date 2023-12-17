import { MasterAnon } from '@ui/masters/masterAnon';
import { ReactElement } from 'react';
import { StatusPage } from '@ui/errors/statusPage';

const Custom402 = () => {
  return (
    <StatusPage
      status="success"
      title="Success"
      message="Sign up success. Wait for confirmation."
    />
  );
};

Custom402.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom402;
