import { ReactNode, ReactElement, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Box, Container, useTheme } from '@mui/material';
import { BreadCrumbs, TBreadCrumb } from '@ui/layout/breadCrumbs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IProps {
  className?: string;
  title?: string | ReactElement;
  filter?: ReactElement;
  quickFilter?: ReactElement;
  breadCrumbs?: TBreadCrumb[];
  children?: ReactNode;
  shadow?: boolean;
}

export const Page = observer((props: IProps) => {
  const { children, title, filter, quickFilter, breadCrumbs, shadow } = props;
  const theme = useTheme();
  return (
    <Fragment>
      <Stack
        id="__page"
        spacing={3}
        alignItems="center"
        sx={{ pb: 20 }}
        flexGrow={1}
      >
        {breadCrumbs && (
          <Box
            id="__breadcrumbs"
            width="100%"
            sx={{ backgroundColor: theme.palette.t1Grey['20'], pt: 2, pb: 2 }}
          >
            <Container maxWidth="xl">
              <BreadCrumbs breadCrumbs={breadCrumbs} />
            </Container>
          </Box>
        )}
        {(title || quickFilter) && (
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
        )}
        {filter && (
          <Box id="__filter" width="100%">
            <Container maxWidth="xl">{filter}</Container>
          </Box>
        )}
        <Box id="__content" width="100%" flexGrow={1}>
          <Container maxWidth="xl">
            {shadow ? (
              <Box sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
                {children}
              </Box>
            ) : (
              children
            )}
          </Container>
        </Box>
      </Stack>
    </Fragment>
  );
});
