import { forwardRef } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { SvgIcon } from '@mui/material';

const IconPuzzle = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5002 1.49959L14.5289 1.50124C14.8699 1.52085 15.3827 1.61517 15.8746 1.84063C16.3649 2.06539 16.8918 2.44818 17.1532 3.07662C17.6331 4.23007 17.1507 5.11686 16.75 5.47188C16.2854 5.9683 16.3137 6.17273 16.3152 6.1792C16.3156 6.18094 16.3162 6.18299 16.3195 6.18777C16.3236 6.19356 16.3335 6.20554 16.3549 6.22174C16.3921 6.24999 16.4507 6.28108 16.5328 6.30909H22.5004V13.2114L22.3731 13.3537C22.1322 13.6231 21.7784 13.7726 21.3535 13.6922C20.9738 13.6204 20.5845 13.3738 20.1772 12.9926L20.156 12.9728L20.1373 12.9507C20.0398 12.8354 19.5864 12.5034 18.8573 12.8034C18.5443 12.9322 18.3086 13.2111 18.1418 13.571C17.9821 13.9156 17.9104 14.2839 17.8928 14.5205C17.9104 14.7572 17.9821 15.1255 18.1418 15.4701C18.3086 15.83 18.5443 16.1089 18.8573 16.2377C19.5864 16.5377 20.0398 16.2057 20.1373 16.0904L20.156 16.0683L20.1772 16.0485C20.5845 15.6673 20.9738 15.4207 21.3535 15.3489C21.7784 15.2685 22.1322 15.418 22.3731 15.6874L22.5004 15.8297V22.5004H16.1795L16.0869 22.4617C15.7579 22.3241 15.3541 22.0327 15.3166 21.4935C15.283 21.0097 15.5692 20.5174 16.0404 20.0196L16.0603 19.9985L16.0825 19.9799C16.1986 19.8827 16.53 19.4346 16.23 18.7135C16.1011 18.4037 15.8212 18.1691 15.458 18.0027C15.1106 17.8436 14.739 17.7722 14.5002 17.7547C14.2613 17.7722 13.8898 17.8436 13.5423 18.0027C13.1791 18.1691 12.8993 18.4037 12.7704 18.7135C12.4703 19.4346 12.8017 19.8827 12.9178 19.9799L12.94 19.9985L12.96 20.0196C13.4311 20.5174 13.7173 21.0097 13.6837 21.4936C13.6462 22.0327 13.2424 22.3241 12.9135 22.4617L12.8209 22.5004H6.27371V16.4062C6.2542 16.3735 6.23681 16.3531 6.22424 16.3417C6.21035 16.329 6.2052 16.3282 6.1949 16.3275C6.14723 16.3242 5.9289 16.353 5.48704 16.762C5.12996 17.1606 4.24112 17.6381 3.08536 17.1624C2.45493 16.903 2.06971 16.3795 1.84312 15.8905C1.61608 15.4005 1.52104 14.8897 1.50127 14.5496L1.49958 14.5205L1.50127 14.4915C1.52104 14.1514 1.61608 13.6406 1.84312 13.1506C2.06971 12.6616 2.45493 12.1381 3.08536 11.8787C4.24112 11.403 5.12996 11.8805 5.48704 12.2791C5.9289 12.6881 6.14723 12.7169 6.1949 12.7136C6.2052 12.7129 6.21035 12.7121 6.22424 12.6994C6.2368 12.688 6.2542 12.6676 6.27371 12.6349V6.30909H12.4675C12.5496 6.28108 12.6082 6.24999 12.6454 6.22174C12.6668 6.20554 12.6767 6.19356 12.6808 6.18777C12.6842 6.18299 12.6847 6.18094 12.6851 6.1792C12.6866 6.17273 12.7149 5.9683 12.2503 5.47187C11.8496 5.11685 11.3672 4.23007 11.8471 3.07662C12.1085 2.44819 12.6354 2.06539 13.1257 1.84063C13.6176 1.61517 14.1304 1.52085 14.4715 1.50124L14.5002 1.49959ZM13.5424 2.74969C13.1792 2.91618 12.8993 3.1509 12.7704 3.46075C12.4703 4.18187 12.8017 4.62993 12.9178 4.72719L12.94 4.74579L12.96 4.76684C13.4779 5.31415 13.7832 5.86855 13.6594 6.40431C13.5317 6.95724 13.0226 7.19312 12.6788 7.29025L12.6121 7.30909H7.27371V12.852L7.23422 12.9453C7.09479 13.2751 6.80151 13.6743 6.2635 13.7113C5.78053 13.7445 5.28711 13.4618 4.78587 12.9926L4.76471 12.9728L4.74597 12.9507C4.64842 12.8354 4.19506 12.5034 3.46593 12.8034C3.15294 12.9322 2.91726 13.2111 2.75044 13.571C2.59076 13.9156 2.51908 14.2839 2.50151 14.5205C2.51908 14.7572 2.59076 15.1255 2.75044 15.4701C2.91726 15.83 3.15294 16.1089 3.46593 16.2377C4.19506 16.5377 4.64842 16.2057 4.74598 16.0904L4.76471 16.0683L4.78587 16.0485C5.28711 15.5793 5.78053 15.2966 6.2635 15.3298C6.80151 15.3668 7.09479 15.766 7.23422 16.0958L7.27371 16.1891V21.5004H12.6063C12.6402 21.4805 12.6612 21.4628 12.6729 21.4501C12.6853 21.4367 12.6855 21.4325 12.6861 21.4248C12.6891 21.3809 12.6621 21.1646 12.2503 20.7246C11.8496 20.3696 11.3672 19.4828 11.8471 18.3293C12.1086 17.7008 12.6355 17.3182 13.1259 17.0936C13.6178 16.8683 14.1305 16.7741 14.4715 16.7545L14.5002 16.7529L14.5289 16.7545C14.8698 16.7741 15.3825 16.8683 15.8745 17.0936C16.3649 17.3182 16.8917 17.7008 17.1532 18.3293C17.6331 19.4828 17.1507 20.3696 16.75 20.7246C16.3382 21.1646 16.3111 21.3803 16.3142 21.4242C16.3147 21.4319 16.3151 21.4367 16.3274 21.4501C16.3391 21.4628 16.3601 21.4805 16.3941 21.5004H21.5004V16.341C21.3862 16.3748 21.1828 16.4802 20.8784 16.762C20.5213 17.1607 19.6324 17.6381 18.4767 17.1624C17.8463 16.903 17.461 16.3795 17.2345 15.8905C17.0074 15.4005 16.9124 14.8897 16.8926 14.5496L16.8909 14.5205L16.8926 14.4915C16.9124 14.1514 17.0074 13.6406 17.2345 13.1506C17.461 12.6616 17.8463 12.1381 18.4767 11.8787C19.6324 11.403 20.5213 11.8804 20.8784 12.2791C21.1828 12.5609 21.3862 12.6663 21.5004 12.7001V7.30909H16.3882L16.3215 7.29025C15.9777 7.19312 15.4687 6.95724 15.3409 6.40431C15.2171 5.86855 15.5224 5.31415 16.0404 4.76684L16.0603 4.74579L16.0825 4.72719C16.1986 4.62993 16.53 4.18187 16.23 3.46075C16.101 3.1509 15.8211 2.91618 15.4579 2.74969C15.1104 2.59042 14.7389 2.51893 14.5002 2.50147C14.2614 2.51893 13.8899 2.59042 13.5424 2.74969Z"
      />
    </SvgIcon>
  );
});

export default IconPuzzle;
