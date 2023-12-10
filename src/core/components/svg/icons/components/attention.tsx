import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconAttention = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.8626 17.5029L12.881 5.50288C12.4909 4.83237 11.5091 4.83237 11.119 5.50288L4.13738 17.5029C3.75621 18.158 4.22486 19 5.01842 19H18.9816C19.7751 19 20.2438 18.158 19.8626 17.5029ZM13.7454 5C12.9697 3.66667 11.0303 3.66667 10.2546 5L3.27302 17C2.49729 18.3333 3.46695 20 5.01842 20H18.9816C20.533 20 21.5027 18.3333 20.727 17L13.7454 5Z"
      />
    </SvgIcon>
  );
});

export default IconAttention;
