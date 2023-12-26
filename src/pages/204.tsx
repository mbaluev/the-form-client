import { MasterAnon } from '@ui/masters/masterAnon';
import { ReactElement } from 'react';
import NoData from '@components/noData';
import { PageContent } from '@ui/layout/page/pageContent';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

const Custom204 = () => {
  return (
    <PageContent>
      <NoData
        sx={{ pt: 20 }}
        icon={<DoNotDisturbIcon />}
        message="No content. Please select item"
      />
    </PageContent>
  );
};

Custom204.getLayout = function getLayout(page: ReactElement) {
  return <MasterAnon>{page}</MasterAnon>;
};
export default Custom204;
