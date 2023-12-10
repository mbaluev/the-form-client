import { styled } from '@mui/material/styles';
import { Tooltip as MuiTooltip, tooltipClasses } from '@mui/material';
import { TooltipProps } from '@mui/material';

export const Tooltip = styled(({ className, children, ...props }: TooltipProps) => {
  if (props.title) {
    return (
      <MuiTooltip classes={{ popper: className }} placement="top" arrow {...props}>
        {children}
      </MuiTooltip>
    );
  } else {
    return children;
  }
})(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 13,
    padding: '7px 12px',
    lineHeight: 1.4,
    marginRight: '10px',
    marginLeft: '10px',
    backgroundColor: theme.palette.t1Grey[250],
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.t1Grey[250],
  },
}));
