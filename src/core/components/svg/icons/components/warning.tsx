import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconWarning = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path d="M11.1667 8.66666H12.8333L12.5556 14.9167H11.4444L11.1667 8.66666Z" />
      <path d="M12 18.5278C12.6136 18.5278 13.1111 17.9681 13.1111 17.2778C13.1111 16.5874 12.6136 16.0278 12 16.0278C11.3863 16.0278 10.8889 16.5874 10.8889 17.2778C10.8889 17.9681 11.3863 18.5278 12 18.5278Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.573 18.2093L12.8157 4.87597C12.4551 4.25616 11.5449 4.25616 11.1843 4.87597L3.42702 18.2093C3.07804 18.8091 3.50411 19.5889 4.24269 19.5889H19.7573C20.4959 19.5889 20.922 18.8091 20.573 18.2093ZM13.9393 4.22222C13.0774 2.74074 10.9226 2.74074 10.0607 4.22222L2.30336 17.5556C1.44143 19.037 2.51884 20.8889 4.24269 20.8889H19.7573C21.4812 20.8889 22.5586 19.037 21.6966 17.5556L13.9393 4.22222Z"
      />
    </SvgIcon>
  );
});

export default IconWarning;
