import { ReactNode, ReactElement, Fragment } from 'react';
import { observer } from 'mobx-react';
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
        <Stack id="__content" direction="row" spacing={3} flexGrow={1} width="100%">
          <Panel flexGrow={1}>{children}</Panel>
          <Panel flexGrow={1}>right</Panel>
        </Stack>
      </Stack>
    </Fragment>
  );
});
