import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const LogoOffice = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      className="logo-office"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M13.2222 77.174V23.3098L60.8709 5.70042L86.7661 13.9872V86.4961L60.8709 94.3019L13.2222 77.174L60.8709 82.9077V20.2028L29.7951 27.4536V69.9236L13.2222 77.174Z"
        fill="#EB3C00"
      />
    </SvgIcon>
  );
});

export default LogoOffice;
