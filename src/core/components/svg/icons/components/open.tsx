import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconOpen = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M19.8037 3.28655H15.1189V2H22V8.88109H20.7134V4.19628L10.3756 14.5341L9.46586 13.6244L19.8037 3.28655ZM2 6.93177C2 5.93056 2.81165 5.11891 3.81287 5.11891H10.9604V6.40546H3.81287C3.52219 6.40546 3.28655 6.6411 3.28655 6.93177L3.28656 20.1871C3.28656 20.4778 3.5222 20.7134 3.81288 20.7134H17.0682C17.3589 20.7134 17.5945 20.4778 17.5945 20.1871V13.0396H18.8811V20.1871C18.8811 21.1884 18.0694 22 17.0682 22H3.81288C2.81166 22 2.00001 21.1884 2.00001 20.1871L2 6.93177Z" />
    </SvgIcon>
  );
});

export default IconOpen;
