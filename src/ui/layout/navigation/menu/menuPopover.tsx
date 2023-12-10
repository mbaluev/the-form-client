import { cloneElement, Fragment } from 'react';
import { IMenuItemDTO } from '@model/common/menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemText, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

interface IProps {
  item: IMenuItemDTO;
}

export const MenuPopover = (props: IProps) => {
  const { item } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Fragment>
      {item.items
        ?.filter((one) => one.url)
        .map((one: IMenuItemDTO, index: number) => {
          const handleClick = () => {};
          return (
            <Link key={index} href={one.url as Url}>
              <MenuItem key={index} onClick={handleClick}>
                {one.icon && (
                  <ListItemIcon>
                    {cloneElement(one.icon, {
                      sx: { color: theme.palette.primary.main },
                    })}
                  </ListItemIcon>
                )}
                <ListItemText>
                  <Typography
                    fontWeight={600}
                    color={theme.palette.primary.main}
                  >
                    {t(one.label)}
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Link>
          );
        })}
    </Fragment>
  );
};
