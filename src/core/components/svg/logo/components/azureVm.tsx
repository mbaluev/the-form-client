import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const LogoAzureVm = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      className="logo-azure-vm"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M78.5435 21.5339H21.4574C20.3435 21.5339 19.4405 22.4369 19.4405 23.5508V60.4022C19.4405 61.5161 20.3435 62.4191 21.4574 62.4191H78.5435C79.6574 62.4191 80.5604 61.5161 80.5604 60.4022V23.5508C80.5604 22.4369 79.6574 21.5339 78.5435 21.5339Z"
        fill="url(#paint0_linear_234_198)"
      />
      <path
        d="M60.1862 35.9969V47.8868L50.0342 53.8664V41.9774L60.1862 35.9978V35.9969Z"
        fill="#50E6FF"
      />
      <path
        d="M60.1862 35.9969L50.0342 41.9765L39.8129 35.9969L50.0342 30.0173L60.1862 35.9969Z"
        fill="#C3F1FF"
      />
      <path
        d="M50.0351 41.9774V53.8673L39.8138 47.8877V35.9969L50.0351 41.9765V41.9774Z"
        fill="#9CEBFF"
      />
      <path
        d="M39.8138 47.8877L50.0351 41.9774V53.8673L39.8138 47.8877Z"
        fill="#C3F1FF"
      />
      <path
        d="M60.1862 47.8877L50.0342 41.9774V53.8673L60.1862 47.8877Z"
        fill="#9CEBFF"
      />
      <path
        d="M65.6762 78.3788C65.6366 78.0242 65.255 75.2486 62.9834 74.912C60.557 74.5529 56.3324 74.0129 56.1524 65.9246V62.4191H43.8431V65.9246C43.6631 74.0138 39.4394 74.5529 37.0121 74.912C34.7387 75.2486 34.3589 78.0278 34.3202 78.3788H34.3166V78.4661H65.6825V78.3788H65.6753H65.6762ZM65.5394 78.3788V78.3752C65.5484 78.3761 65.5619 78.377 65.57 78.3788H65.5394Z"
        fill="url(#paint1_linear_234_198)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_234_198"
          x1="50"
          y1="62.3507"
          x2="50"
          y2="21.5348"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0078D4" />
          <stop offset="0.82" stopColor="#5EA0EF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_234_198"
          x1="50"
          y1="78.4661"
          x2="50"
          y2="62.4191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CDCFD0" />
          <stop offset="0.22" stopColor="#BBBDBE" />
          <stop offset="0.65" stopColor="#8F9091" />
          <stop offset="0.79" stopColor="#808081" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
});

export default LogoAzureVm;
