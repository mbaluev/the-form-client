import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { Fragment } from 'react';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import NoData from '@components/noData';

export const PagePanelNoData = observer(() => {
  const router = useRouter();
  const tab = (router.query.slug?.[1] as string) || ROUTES.SCHOOL_BLOCK.tabs.keys.materials;

  return (
    <Fragment>
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.materials && (
        <NoData icon={<SearchOffIcon />} message="No content. Material not found" />
      )}
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.homework && (
        <NoData icon={<SearchOffIcon />} message="No content. Task not found" />
      )}
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.test && (
        <NoData icon={<SearchOffIcon />} message="No content. Question not found" />
      )}
    </Fragment>
  );
});
