import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';

const IconTheForm = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M21.9787 11.9894V5.97872H21.9894C21.9894 3.78723 20.2128 2.01064 18.0213 2.01064H11.9894H5.96809C3.7766 2.01064 2 3.78723 2 5.97872H2.01064V12V18.0213H2C2 20.2128 3.7766 21.9894 5.96809 21.9894H12H18.0319C20.2234 21.9894 22 20.2128 22 18.0213H21.9894V11.9894H21.9787ZM9.2766 13.7872V18.5957H6.21277V11.3298H9.26596H15.0319V13.7872H9.2766ZM16.2447 7.28723C16.1383 7.46808 16.0319 7.64893 15.9362 7.84042H10.6383H6.21277V5.38298H17.7766C17.1809 5.94681 16.6702 6.57447 16.2447 7.28723Z" />
    </SvgIcon>
  );
});

export default IconTheForm;
