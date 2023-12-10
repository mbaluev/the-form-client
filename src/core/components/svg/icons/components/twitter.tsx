import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconTwitter = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM17.03 10.415C17.03 13.6 14.605 17.275 10.17 17.275C8.81 17.275 7.54 16.875 6.485 16.185C6.675 16.21 6.865 16.22 7.06 16.22C8.19 16.22 9.23 15.835 10.055 15.19C9 15.17 8.11 14.475 7.805 13.515C7.955 13.545 8.105 13.56 8.26 13.56C8.48 13.56 8.695 13.53 8.895 13.475C7.79 13.25 6.96 12.28 6.96 11.11V11.08C7.285 11.26 7.655 11.37 8.05 11.38C7.4 10.95 6.975 10.21 6.975 9.375C6.975 8.935 7.095 8.52 7.3 8.165C8.49 9.625 10.265 10.585 12.27 10.685C12.225 10.51 12.205 10.325 12.205 10.135C12.205 8.805 13.285 7.725 14.615 7.725C15.31 7.725 15.935 8.015 16.375 8.485C16.925 8.375 17.44 8.175 17.905 7.9C17.725 8.465 17.345 8.935 16.845 9.235C17.335 9.175 17.8 9.045 18.23 8.855C17.905 9.34 17.495 9.765 17.025 10.105C17.03 10.205 17.03 10.31 17.03 10.415Z"
        fill="#1B9DF0"
      />
    </SvgIcon>
  );
});

export default IconTwitter;
