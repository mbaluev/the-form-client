import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconImport = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M16.3125 2H5.125C4.4375 2 3.875 2.5625 3.875 3.25V20.75C3.875 21.4375 4.4375 22 5.125 22H18.875C19.5625 22 20.125 21.4375 20.125 20.75V5.46875L16.3125 2ZM16.6875 4.03125L17.875 5.125H16.6875V4.03125ZM5.125 20.75V3.25H15.4375V6.375H18.875V20.75H5.125Z" />
      <path d="M15.2187 10.5L14.4062 11.4375L12.625 9.875V15.6562H11.375V9.875L9.59375 11.4375L8.78125 10.5L12 7.625L15.2187 10.5Z" />
      <path d="M17 17H7V18.25H17V17Z" />
    </SvgIcon>
  );
});

export default IconImport;
