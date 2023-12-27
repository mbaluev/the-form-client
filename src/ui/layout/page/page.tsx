import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { BreadCrumbs, TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

interface IProps {
  children?: ReactNode;
  breadCrumbs?: TBreadCrumb[];
  right?: ReactNode;
}

export const Page = observer((props: IProps) => {
  const { children, breadCrumbs, right } = props;
  return (
    <Stack id="__page" spacing={3} height="100%" flexGrow={1}>
      {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
      <Box
        id="__page_wrapper"
        flexGrow={1}
        width="100%"
        display="grid"
        gridTemplateColumns={right ? '1fr 1fr' : '1fr'}
        gap={3}
        overflow="hidden"
      >
        {children}
        {right}
      </Box>
    </Stack>
  );
});
