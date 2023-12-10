import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconAddItem = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path d="M11.3878 2H3.63265C3.40816 2 3.22449 2.1875 3.22449 2.41667V10.3333C3.22449 10.5625 3.40816 10.75 3.63265 10.75H11.3878C11.6122 10.75 11.7959 10.5625 11.7959 10.3333V2.41667C11.7959 2.1875 11.6122 2 11.3878 2ZM10.0612 8.97917H4.95918V3.77083H10.0612V8.97917ZM21.5918 2H13.8367C13.6122 2 13.4286 2.1875 13.4286 2.41667V10.3333C13.4286 10.5625 13.6122 10.75 13.8367 10.75H21.5918C21.8163 10.75 22 10.5625 22 10.3333V2.41667C22 2.1875 21.8163 2 21.5918 2ZM20.2653 8.97917H15.1633V3.77083H20.2653V8.97917ZM21.5918 12.4167H13.8367C13.6122 12.4167 13.4286 12.6042 13.4286 12.8333V20.75C13.4286 20.9792 13.6122 21.1667 13.8367 21.1667H21.5918C21.8163 21.1667 22 20.9792 22 20.75V12.8333C22 12.6042 21.8163 12.4167 21.5918 12.4167ZM20.2653 19.3958H15.1633V14.1875H20.2653V19.3958ZM10.3673 16.7917H7.10204V13.4583C7.10204 13.3437 7.0102 13.25 6.89796 13.25H5.67347C5.56122 13.25 5.46939 13.3437 5.46939 13.4583V16.7917H2.20408C2.09184 16.7917 2 16.8854 2 17V18.25C2 18.3646 2.09184 18.4583 2.20408 18.4583H5.46939V21.7917C5.46939 21.9062 5.56122 22 5.67347 22H6.89796C7.0102 22 7.10204 21.9062 7.10204 21.7917V18.4583H10.3673C10.4796 18.4583 10.5714 18.3646 10.5714 18.25V17C10.5714 16.8854 10.4796 16.7917 10.3673 16.7917Z" />
    </SvgIcon>
  );
});

export default IconAddItem;
