import { Fragment, ReactElement, ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import { Button, IconButton, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

export type TBreadCrumb = {
  url?: Url;
  label: string | ReactElement;
};

interface IProps {
  className?: string;
  breadCrumbs?: TBreadCrumb[];
  children?: ReactNode;
}

export const BreadCrumbs = (props: IProps) => {
  const { breadCrumbs } = props;
  const router = useRouter();
  const theme = useTheme();
  const handleBack = async () => {
    if (breadCrumbs && breadCrumbs.length > 2) {
      const breadCrumb = breadCrumbs[breadCrumbs.length - 2];
      if (breadCrumb.url) await router.push(breadCrumb.url);
    }
  };
  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
      {breadCrumbs && breadCrumbs.length > 2 && (
        <IconButton size="small" color="primary" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      )}
      {breadCrumbs?.map((item, index, arr) => {
        return (
          <Fragment key={index}>
            {item.url ? (
              <Link href={item.url} passHref>
                <Button size="small">{item.label}</Button>
              </Link>
            ) : (
              <Button size="small" disabled>
                {item.label}
              </Button>
            )}
            {index < arr.length - 1 && (
              <Typography fontWeight={600} color={theme.palette.t1Grey['100']}>
                /
              </Typography>
            )}
          </Fragment>
        );
      })}
    </Stack>
  );
};
