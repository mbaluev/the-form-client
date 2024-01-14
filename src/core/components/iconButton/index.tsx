import React, { Ref } from 'react';
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material';
import { classNames } from '@utils/classNames';
import { TButtonColorTypes, TButtonSizeTypes } from '@components/button';
import { TooltipProps } from '@mui/material';
import { Tooltip } from '@components/tooltip';
import './index.scss';

export type IIconButtonProps = Omit<MuiIconButtonProps, 'color' | 'size'> & {
  color?: TButtonColorTypes;
  size?: TButtonSizeTypes;
  tooltip?: TooltipProps['title'];
  tooltipPlacement?: TooltipProps['placement'];
};

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<IIconButtonProps>
>((props, ref: Ref<HTMLButtonElement>) => {
  const {
    className = '',
    children,
    color = 'blue',
    size = 'default',
    tooltip,
    tooltipPlacement = 'top',
    ...other
  } = props;

  const cls = classNames('button', 'icon-button', 'MuiButton-text', {
    [`${className}`]: !!className,
    [`button_size_${size}`]: !!size,
    [`button_color_${color}`]: !!color,
  });

  return tooltip ? (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <div>
        <MuiIconButton className={cls} {...other}>
          {children}
        </MuiIconButton>
      </div>
    </Tooltip>
  ) : (
    <MuiIconButton ref={ref} className={cls} {...other}>
      {children}
    </MuiIconButton>
  );
});
