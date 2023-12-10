import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconRevenue = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M19.8125 22H15.4375V8.875H19.8125V22ZM16.6875 20.75H18.5625V10.125H16.6875V20.75ZM14.1875 22H9.8125V12.625H14.1875V22ZM11.0625 20.75H12.9375V13.875H11.0625V20.75ZM8.5625 22H4.1875V15.75H8.5625V22ZM5.4375 20.75H7.3125V17H5.4375V20.75ZM5.21875 13.0938L4.40625 12.1562L11.4063 6.15625L13.0938 7.84375L17.6875 3.25H15.75V2H19.8125V6.0625H18.5625V4.125L13.0938 9.59375L11.3437 7.84375L5.21875 13.0938Z" />
    </SvgIcon>
  );
});

export default IconRevenue;
