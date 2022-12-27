import { styled } from '@mui/material/styles';
import {
  Tooltip as MuiTooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';

export const Tooltip = styled(({ className, ...props }: TooltipProps) => {
  if (props.title) {
    return (
      <MuiTooltip
        classes={{ popper: className }}
        placement="top"
        arrow
        {...props}
      />
    );
  } else {
    return props.children;
  }
})(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 13,
    padding: '7px 12px',
    lineHeight: 'normal',
    marginRight: '10px',
    marginLeft: '10px',
  },
}));
