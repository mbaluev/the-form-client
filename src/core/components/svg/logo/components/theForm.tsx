import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const LogoTheForm = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      className="logo-365"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5ZM69.1489 27.9787L63.1206 37.2695H30.8511V27.9787H69.1489ZM30.8511 48.0142V72.1277H40.9574V57.1277H60.1064V48.0142H30.8511Z"
        />
      </svg>
    </SvgIcon>
  );
});

export default LogoTheForm;
