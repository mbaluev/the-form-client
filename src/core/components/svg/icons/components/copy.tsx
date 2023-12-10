import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconCopy = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M6.13397 21.9973C5.99717 21.9676 5.85956 21.9402 5.72317 21.9078C5.02105 21.7412 4.39682 21.3538 3.94945 20.8071C3.50208 20.2604 3.25716 19.5857 3.25353 18.8899C3.24866 15.3487 3.24866 11.8075 3.25353 8.26632C3.25587 7.44586 3.59507 6.65952 4.19724 6.07859C4.7994 5.49767 5.61574 5.16922 6.46845 5.16479C9.07286 5.15646 11.6771 5.15646 14.2813 5.16479C16.0446 5.17143 17.4917 6.55405 17.4974 8.24913C17.5066 11.8026 17.5066 15.3568 17.4974 18.9117C17.4938 20.4428 16.3056 21.7379 14.7302 21.9644C14.6919 21.9733 14.6544 21.9852 14.6182 22L6.13397 21.9973ZM4.8756 13.5754C4.8756 15.3069 4.8756 17.0384 4.8756 18.77C4.8756 19.7741 5.5604 20.4354 6.60119 20.4354C9.11792 20.4354 11.6346 20.4354 14.1514 20.4354C15.1918 20.4354 15.877 19.7741 15.877 18.77C15.877 15.3142 15.877 11.8581 15.877 8.40185C15.877 7.38636 15.1954 6.72708 14.1408 6.72669C11.6314 6.72669 9.12184 6.72669 6.61215 6.72669C5.55674 6.72669 4.87682 7.38402 4.87642 8.40185C4.87425 10.1261 4.87398 11.8506 4.8756 13.5754Z" />
      <path d="M17.8652 2C18.0276 2.03906 18.192 2.0703 18.3523 2.11248C19.7499 2.4765 20.742 3.69508 20.7449 5.08552C20.7516 9.01727 20.7516 12.9477 20.7449 16.8769C20.7449 17.3534 20.3986 17.6998 19.933 17.7002C19.4674 17.7006 19.1212 17.3487 19.1212 16.8585C19.1212 12.9739 19.1212 9.08927 19.1212 5.20464C19.1212 4.35007 18.5833 3.72047 17.7362 3.5826C17.6091 3.56591 17.4808 3.55938 17.3526 3.56307C14.4391 3.56255 11.525 3.56229 8.61017 3.56229C8.4755 3.56539 8.34111 3.54893 8.21155 3.51347C7.90467 3.41934 7.69115 3.12875 7.67776 2.81942C7.67004 2.66557 7.70998 2.51299 7.79251 2.38101C7.87504 2.24904 7.99644 2.14361 8.14132 2.07811C8.20181 2.05077 8.2631 2.02695 8.32602 2H17.8652Z" />
    </SvgIcon>
  );
});

export default IconCopy;
