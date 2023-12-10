import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconConnect = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path d="M5.94282 5.28552L2 8.85475L5.60017 12.4549L6.47582 11.5793L4.41043 9.51149H14.4882V8.25988H4.53416L6.7566 6.22542L5.94282 5.28552Z" />
      <path d="M18.0572 11.5451L22 15.1143L18.3998 18.7145L17.5242 17.8388L19.5896 15.771H9.51183V14.5194H19.4658L17.2434 12.485L18.0572 11.5451Z" />
    </SvgIcon>
  );
});

export default IconConnect;
