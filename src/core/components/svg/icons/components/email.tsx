import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconEmail = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M2 5.125V18.875H22V5.125H2ZM12 11.25L4.6875 6.375H19.3125L12 11.25ZM9.15625 10.8437L3.25 16.75V6.90625L9.15625 10.8437ZM10.2187 11.5625L12 12.75L13.7813 11.5625L19.875 17.625H4.125L10.2187 11.5625ZM14.8437 10.8437L20.75 6.90625V16.7187L14.8437 10.8437Z" />
    </SvgIcon>
  );
});

export default IconEmail;
