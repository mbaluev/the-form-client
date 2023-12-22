import { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { Panel } from '@ui/layout/page/panel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export type TBreadCrumb = {
  url: Url;
  label: string;
};

interface IProps {
  breadCrumbs?: TBreadCrumb[];
}

export const BreadCrumbs = (props: IProps) => {
  const { breadCrumbs } = props;
  return (
    <Panel sx={{ p: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        {breadCrumbs && breadCrumbs.length > 1 && (
          <Link href={breadCrumbs[breadCrumbs.length - 2].url} passHref>
            <IconButton size="small" color="secondary">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        )}
        {breadCrumbs?.map((item, index, arr) => {
          return (
            <Fragment key={index}>
              <Link href={item.url} passHref>
                <Button size="small" color="secondary">
                  {item.label}
                </Button>
              </Link>
              {index < arr.length - 1 && <ChevronRightIcon color="secondary" />}
            </Fragment>
          );
        })}
      </Stack>
    </Panel>
  );
};
