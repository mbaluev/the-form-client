import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconCloudSync = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M17.9388 7.60317V7.74317C19.927 7.88318 21.5 9.44654 21.5 11.3705C21.5 12.6819 20.7663 13.8268 19.6623 14.4639C18.5583 15.1009 18.2119 13.9724 19 13.5376C19.7881 13.1028 20.3129 12.2986 20.3129 11.3705C20.3129 9.97473 19.1258 8.85896 17.6409 8.85896H16.5711L16.6908 8.21621C16.7201 7.99347 16.7494 7.79833 16.7494 7.60317C16.7494 5.67918 15.0884 4.11581 13.0393 4.11581C11.5836 4.11581 10.2769 4.92401 9.65406 6.15222L9.44643 6.62739L8.94091 6.45981C8.73328 6.40253 8.52566 6.34738 8.28869 6.34738C7.21897 6.34738 6.35913 7.15557 6.35913 8.16106V8.30107L6.38847 8.80381L5.8536 8.88654C4.60785 9.10927 3.68708 10.1699 3.68708 11.3705C3.68708 12.0846 3.99773 12.7253 4.5 13.1809C5.00227 13.6365 4.55541 14.732 3.77299 14.0689C2.99056 13.4059 2.5 12.4449 2.5 11.3727C2.5 9.7817 3.59906 8.38804 5.17205 7.91287C5.321 6.40465 6.65703 5.23372 8.28869 5.23372C8.46698 5.23372 8.64527 5.26129 8.82355 5.28887C9.68565 3.89307 11.3173 3.00002 13.0415 3.00002C15.7429 3.00002 17.9388 5.06401 17.9388 7.60317Z" />
      <path
        d="M18.7177 19.6308L17.5466 17.7597C16.7749 19.653 14.7939 21 12.4718 21C10.1119 21 8.10428 19.6087 7.36023 17.6667H8.33098C9.02796 19.1383 10.6197 20.1667 12.4718 20.1667C14.4314 20.1667 16.0995 19.0155 16.7248 17.4062L14.5037 18.5892L14.052 17.8675L17.5059 16.0279L19.5 19.2142L18.7177 19.6308Z"
        fill="#48cc1a"
      />
      <path
        d="M17.5834 14.3334C16.8394 12.3914 14.8317 11 12.4718 11C10.1499 11 8.16899 12.3469 7.39713 14.24L6.28231 12.4587L5.5 12.8754L7.49411 16.0616L10.948 14.2221L10.4963 13.5004L8.16456 14.7423C8.74268 13.0558 10.4525 11.8334 12.4718 11.8334C14.3239 11.8334 15.9157 12.8618 16.6127 14.3334H17.5834Z"
        fill="#48cc1a"
      />
    </SvgIcon>
  );
});

export default IconCloudSync;
