import React, { FC, MouseEvent, useState } from 'react';
import { Url } from 'url';
import { classNames } from '@utils/classNames';
import { Button } from '@components/button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './index.scss';
import { ListItemText } from '@mui/material';

export type TBreadCrumb = {
  label: string;
  url: Partial<Url>;
  last?: boolean;
  className?: string;
  disabled?: boolean;
  complete?: boolean;
  selected?: boolean;
  neighbors?: TBreadCrumb[];
};

export const BreadCrumb: FC<TBreadCrumb> = (props) => {
  const { className, label, url, last, disabled, neighbors } = props;

  const cls = classNames('bread-crumb', className);
  const clsItem = classNames('bread-crumb__item');
  const clsSeparator = classNames('bread-crumb__separator');
  const clsDropDown = classNames('bread-crumb__dropdown');

  if (Boolean(neighbors)) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e: MouseEvent<any>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <div className={cls}>
        <div className={clsItem}>
          <Button
            color="grey"
            size="small"
            variant="text"
            onClick={handleOpen}
            endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            disabled={disabled}
          >
            {label}
          </Button>
          <Menu
            anchorEl={anchorEl}
            className={clsDropDown}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 2,
              sx: { mt: 1 },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            {neighbors?.map((item, index) => {
              const clsMenuItem = item.selected ? 'color_blue' : undefined;
              const clsIcon = item.selected ? 'color_blue' : 'color_grey-100';
              return (
                <Link key={index} href={item.url} passHref>
                  <MenuItem className={clsMenuItem} disabled={item.disabled}>
                    {item.complete !== undefined && (
                      <ListItemIcon>
                        {item.complete ? (
                          <CheckCircleIcon
                            fontSize="small"
                            className={clsIcon}
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            fontSize="small"
                            className={clsIcon}
                          />
                        )}
                      </ListItemIcon>
                    )}
                    <ListItemText>{item.label}</ListItemText>
                  </MenuItem>
                </Link>
              );
            })}
          </Menu>
        </div>
        {!last && <ChevronRightIcon className={clsSeparator} />}
      </div>
    );
  }

  return (
    <div className={cls}>
      <div className={clsItem}>
        {disabled ? (
          <Button color="grey" size="small" variant="text" disabled>
            {label}
          </Button>
        ) : (
          <Link href={url} passHref>
            <Button color="grey" size="small" variant="text">
              {label}
            </Button>
          </Link>
        )}
      </div>
      {!last && <ChevronRightIcon className={clsSeparator} />}
    </div>
  );
};
