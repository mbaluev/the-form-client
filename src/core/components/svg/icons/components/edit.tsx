import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconEdit = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M22 7.57994L16.4514 2L13.8495 4.60188L2 16.4201V22H7.57994L19.837 9.77429L22 7.57994ZM20.2445 7.57994L18.9279 8.89655L15.1348 5.0721L16.4201 3.75549L20.2445 7.57994ZM3.25392 18.2069L5.8558 20.7461H3.25392V18.2069ZM7.32915 20.4639L3.47335 16.7022L14.2257 5.98119L18.0502 9.77429L7.32915 20.4639Z" />
    </SvgIcon>
  );
});

export default IconEdit;
