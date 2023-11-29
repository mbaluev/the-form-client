import { Page500 } from '@ui/pages/errors/500';
import { MasterAnon } from '@ui/masters/masterAnon';

const Custom500 = () => {
  return <Page500 />;
};

Custom500.Layout = MasterAnon;
export default Custom500;
