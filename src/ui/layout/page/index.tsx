import { ReactNode, ReactElement, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Box, Grid } from '@mui/material';
import { BreadCrumbs, TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import Stack from '@mui/material/Stack';
import { Panel } from '@ui/layout/page/panel';

interface IProps {
  className?: string;
  title?: string | ReactElement;
  filter?: ReactElement;
  quickFilter?: ReactElement;
  breadCrumbs?: TBreadCrumb[];
  children?: ReactNode;
}

export const Page = observer((props: IProps) => {
  const { children, title, filter, quickFilter, breadCrumbs } = props;
  console.log(title, filter, quickFilter);
  return (
    <Fragment>
      <Stack id="__page" spacing={3} height="100%" flexGrow={1}>
        {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
        {/*{(title || quickFilter) && (
          <Box id="__title" width="100%">
            <Container maxWidth="xl">
              <Stack direction="row" spacing={3} justifyContent="space-between">
                {title &&
                  (typeof title === 'string' ? (
                    <Typography
                      fontSize="1.3rem"
                      lineHeight="37px"
                      fontWeight={600}
                      flexGrow={1}
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {title}
                    </Typography>
                  ) : (
                    title
                  ))}
                {quickFilter && <Stack flexGrow={0}>{quickFilter}</Stack>}
              </Stack>
            </Container>
          </Box>
        )}*/}
        <Box id="__content" flexGrow={1}>
          <Grid container spacing={3} height="100%">
            <Grid item xs={6}>
              <Panel sx={{ height: '100%' }}>{children}</Panel>
            </Grid>
            <Grid item xs={6}>
              <Panel sx={{ height: '100%' }}>right</Panel>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Fragment>
  );
});
