import { MasterAnon } from '@ui/masters/masterAnon';
import { ReactElement } from 'react';
import { ErrorIcon } from '@ui/layout/page/errorIcon';

const Custom204 = () => {
  return <ErrorIcon status="secondary" message="No content. Please select item" />;
};

Custom204.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom204;
