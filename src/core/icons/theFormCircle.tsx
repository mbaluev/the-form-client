import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';

const IconTheFormCircle = forwardRef<SVGSVGElement, SvgIconProps>(
  (props, ref) => {
    return (
      <SvgIcon
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0ZM142.553 51.0638L129.157 71.71H57.4468V51.0638H142.553ZM57.4468 95.5871V149.173H79.9054V115.839H122.459V95.5871H57.4468Z"
          />
        </svg>
      </SvgIcon>
    );
  }
);

export default IconTheFormCircle;
