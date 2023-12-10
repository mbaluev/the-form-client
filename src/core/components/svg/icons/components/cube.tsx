import { forwardRef } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { SvgIcon } from '@mui/material';

const IconCube = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path d="M12.0024 2L2.06257 5.72565V18.0241L12 22L21.9374 17.9934V5.63357L12.0024 2ZM19.508 6.09633L12.0024 8.86342L4.4637 6.16244L12.0024 3.33396L19.508 6.09633ZM3.30445 7.05253L11.3791 9.94475V20.3851L3.30445 17.1552V7.05253ZM12.6233 20.3851V9.94003L20.6979 6.99351V17.1552L12.6233 20.3851Z" />
    </SvgIcon>
  );
});

export default IconCube;
