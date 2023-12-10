import { forwardRef } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { SvgIcon } from '@mui/material';

const IconMS = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path d="M2 2H22V22H2V2Z" fill="#F3F3F3" />
      <path
        d="M2.86957 2.86957H11.5652V11.5652H2.86957V2.86957Z"
        fill="#F35325"
      />
      <path
        d="M12.4348 2.86957H21.1304V11.5652H12.4348V2.86957Z"
        fill="#81BC06"
      />
      <path
        d="M2.86957 12.4348H11.5652V21.1304H2.86957V12.4348Z"
        fill="#05A6F0"
      />
      <path
        d="M12.4348 12.4348H21.1304V21.1304H12.4348V12.4348Z"
        fill="#FFBA08"
      />
    </SvgIcon>
  );
});

export default IconMS;
