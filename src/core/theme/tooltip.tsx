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
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '7px 12px',
    lineHeight: 'normal',
    marginRight: '10px',
    marginLeft: '10px',
    backgroundColor: theme.palette.secondary.dark,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.secondary.dark,
  },
}));
