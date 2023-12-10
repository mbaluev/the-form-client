import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const LogoMicrosoft = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      className="logo-microsoft"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M8.91304 8.91304H48.0435V48.0435H8.91304V8.91304Z"
        fill="#F35325"
      />
      <path
        d="M51.9565 8.91304H91.087V48.0435H51.9565V8.91304Z"
        fill="#81BC06"
      />
      <path
        d="M8.91304 51.9565H48.0435V91.0869H8.91304V51.9565Z"
        fill="#05A6F0"
      />
      <path
        d="M51.9565 51.9565H91.087V91.0869H51.9565V51.9565Z"
        fill="#FFBA08"
      />
    </SvgIcon>
  );
});

export default LogoMicrosoft;
