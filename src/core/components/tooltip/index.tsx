import { styled } from '@mui/material/styles';
import { Tooltip as MuiTooltip, tooltipClasses, TooltipProps } from '@mui/material';

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
})(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '1rem',
    padding: '7px 12px',
    lineHeight: 'normal',
    marginRight: '10px',
    marginLeft: '10px',
  },
}));
