import { forwardRef } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { SvgIcon } from '@mui/material';

const IconTrash = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M18.875 4.5H15.125V3.25C15.125 2.5625 14.5625 2 13.875 2H10.125C9.4375 2 8.875 2.5625 8.875 3.25V4.5H5.125C4.4375 4.5 3.875 5.0625 3.875 5.75V8.25H5.15625L5.96875 20.25C6.03125 21.2188 6.84375 22 7.84375 22H16.125C17.0937 22 17.9375 21.2188 18 20.25L18.8437 8.25H20.125V5.75C20.125 5.0625 19.5625 4.5 18.875 4.5ZM10.125 3.25H13.875V4.5H10.125V3.25ZM16.7812 20.1562C16.75 20.4687 16.5 20.75 16.1562 20.75H7.84375C7.53125 20.75 7.25 20.5 7.21875 20.1562L6.40625 8.25H17.5625L16.7812 20.1562ZM18.875 7H5.125V5.75H18.875V7Z" />
      <path d="M9.81161 18.2217L9.18605 10.0891L7.93968 10.185L8.56524 18.3176L9.81161 18.2217Z" />
      <path d="M12.625 10.125H11.375V18.25H12.625V10.125Z" />
      <path d="M16.0602 10.1852L14.8138 10.0894L14.1885 18.222L15.4349 18.3178L16.0602 10.1852Z" />
    </SvgIcon>
  );
});

export default IconTrash;