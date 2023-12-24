import { ReactNode, ReactElement, Fragment } from 'react';
import { observer } from 'mobx-react';
import { BreadCrumbs, TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import Stack from '@mui/material/Stack';
import { Panel } from '@ui/layout/page/panel';
import { Box } from '@mui/material';

interface IProps {
  children?: ReactNode;
  breadCrumbs?: TBreadCrumb[];
  title?: ReactElement;
  filter?: ReactElement;
  quickFilter?: ReactElement;
  right?: ReactNode;
}

export const Page = observer((props: IProps) => {
  const { children, breadCrumbs, right } = props;
  return (
    <Fragment>
      <Stack id="__page" spacing={3} height="100%" flexGrow={1}>
        {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
        <Box
          id="__content"
          flexGrow={1}
          width="100%"
          display="grid"
          gridTemplateColumns={right ? '1fr 1fr' : '1fr'}
          gap={3}
        >
          <Panel>{children}</Panel>
          {right && <Panel>{right}</Panel>}
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
        </Box>
      </Stack>
    </Fragment>
  );
});
