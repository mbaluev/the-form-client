import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconFacebook = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path
        d="M22 12.0609C22 6.52354 17.5228 2.03461 12 2.03461C6.47715 2.03461 2 6.52354 2 12.0609C2 17.0653 5.65686 21.2133 10.4375 21.9654V14.9592H7.89844V12.0609H10.4375V9.852C10.4375 7.33915 11.9304 5.95114 14.2146 5.95114C15.3087 5.95114 16.4531 6.14696 16.4531 6.14696V8.61438H15.1921C13.9499 8.61438 13.5625 9.38724 13.5625 10.1802V12.0609H16.3359L15.8926 14.9592H13.5625V21.9654C18.3431 21.2133 22 17.0653 22 12.0609Z"
        fill="#1877F2"
      />
    </SvgIcon>
  );
});

export default IconFacebook;
