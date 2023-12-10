import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const IconUfo = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <path d="M12.4347 2C12.5724 2.03384 12.7112 2.06301 12.8466 2.10152C14.1453 2.47375 14.8769 3.28355 15.1173 4.50175C15.4673 4.50175 15.8267 4.50175 16.1873 4.50175C17.3542 4.50992 18.2771 5.36173 18.2573 6.4049C18.241 7.35589 17.3903 8.16569 16.3331 8.2112C15.7497 8.23571 15.1663 8.22637 14.5735 8.22054C14.4102 8.22054 14.3296 8.25204 14.297 8.40957C14.1091 9.31972 13.7019 9.51459 12.7719 9.48308C12.1499 9.46324 11.5257 9.48308 10.9049 9.48308C10.2841 9.48308 9.93175 9.22871 9.78472 8.69662C9.65403 8.22987 9.65403 8.22987 9.10327 8.22987C8.61903 8.22987 8.13245 8.23804 7.6482 8.21587C6.6482 8.17036 5.80923 7.39907 5.74738 6.48892C5.68554 5.57876 6.41249 4.68378 7.40549 4.54726C7.82985 4.50865 8.25601 4.49345 8.68204 4.50175C8.74622 4.50175 8.81039 4.50175 8.8349 4.50175C8.98192 4.14236 9.07994 3.7853 9.26664 3.47258C9.74271 2.67445 10.4953 2.19487 11.4918 2.03501C11.5178 2.02669 11.5425 2.01492 11.5654 2H12.4347ZM9.58052 4.50058H11.1441C11.5432 4.50058 11.9411 4.50058 12.3401 4.50058C12.514 4.50058 12.6529 4.5846 12.6587 4.73396C12.65 4.85268 12.5951 4.96327 12.5058 5.04201C12.451 5.09335 12.3168 5.08635 12.2188 5.08751C10.7987 5.08751 9.37749 5.08751 7.95742 5.08751C7.77021 5.08615 7.58358 5.10849 7.40199 5.15403C6.71471 5.33722 6.32498 5.92065 6.43233 6.5811C6.52685 7.16453 7.12661 7.6196 7.80573 7.62077C9.37049 7.62077 10.9364 7.62077 12.5012 7.62077C13.7404 7.62077 14.9796 7.62077 16.2176 7.62077C17.0344 7.62077 17.675 6.95683 17.5805 6.23104C17.493 5.55309 16.9154 5.09335 16.1278 5.08751C15.3401 5.08168 14.577 5.08751 13.8022 5.08751C13.5513 5.08751 13.4055 4.97083 13.4125 4.7853C13.4195 4.59977 13.5689 4.50408 13.8022 4.50175C14.0088 4.50175 14.2153 4.50175 14.4253 4.50175C14.2281 3.3699 13.178 2.56243 11.9621 2.58343C10.7462 2.60443 9.71821 3.43991 9.58052 4.50058ZM13.6645 8.24154H10.3413C10.3798 8.38623 10.4043 8.51342 10.4475 8.63477C10.4715 8.71255 10.5214 8.77976 10.5889 8.8252C10.6564 8.87064 10.7375 8.89156 10.8186 8.88448C11.6066 8.88448 12.3946 8.88448 13.1826 8.88448C13.2631 8.89266 13.3439 8.87272 13.4113 8.82805C13.4788 8.78338 13.5287 8.71673 13.5525 8.63944C13.5957 8.51225 13.6214 8.38506 13.6599 8.24154H13.6645Z" />
      <path d="M6.54318 21.4131C7.31914 21.4131 8.0601 21.4131 8.80922 21.4131C8.84093 21.4066 8.87062 21.3927 8.8958 21.3724C8.92098 21.3521 8.94091 21.326 8.95391 21.2964C9.2783 19.7266 9.59841 18.1564 9.91424 16.5858C10.2254 15.0595 10.5338 13.5333 10.8396 12.007C10.8446 11.9603 10.8593 11.9152 10.8829 11.8745C10.9065 11.8339 10.9383 11.7987 10.9764 11.7712C11.0145 11.7437 11.0579 11.7245 11.1039 11.7148C11.1499 11.7052 11.1974 11.7054 11.2433 11.7153C11.4475 11.7561 11.535 11.9008 11.4907 12.1214L9.90491 19.9697C9.80922 20.4422 9.71004 20.9137 9.60969 21.3991H14.3857C14.2939 20.9417 14.2021 20.4854 14.1103 20.0303C13.7836 18.4216 13.4572 16.8125 13.1313 15.203C12.9224 14.175 12.717 13.147 12.5082 12.119C12.4638 11.8961 12.5455 11.7538 12.7509 11.7106C12.7966 11.6999 12.8441 11.6991 12.8902 11.7081C12.9364 11.7171 12.98 11.7358 13.0184 11.7629C13.0568 11.79 13.0889 11.825 13.1128 11.8654C13.1367 11.9059 13.1517 11.951 13.1569 11.9977C13.2946 12.6616 13.4265 13.3256 13.5607 13.9895C13.8991 15.6698 14.2386 17.3493 14.5794 19.028C14.731 19.7748 14.8862 20.5216 15.0356 21.2695C15.0519 21.3547 15.0613 21.4142 15.1838 21.4142C15.9306 21.4142 16.6762 21.4142 17.4487 21.4142C17.4242 21.3291 17.4078 21.2567 17.3822 21.1879L13.4918 10.7036C13.4708 10.6476 13.4498 10.5869 13.4347 10.5356C13.4198 10.4958 13.4139 10.4533 13.4174 10.411C13.4209 10.3687 13.4337 10.3276 13.4549 10.2909C13.476 10.2541 13.5051 10.2224 13.5399 10.1982C13.5748 10.1739 13.6145 10.1576 13.6564 10.1505C13.7376 10.1254 13.8255 10.1331 13.9011 10.1719C13.9768 10.2107 14.0343 10.2776 14.0613 10.3582C14.2176 10.7561 14.3635 11.1575 14.5117 11.5578C15.7058 14.7775 16.8979 17.9977 18.0881 21.2182C18.0944 21.2512 18.1071 21.2825 18.1257 21.3105C18.1442 21.3385 18.1682 21.3624 18.1961 21.381C18.224 21.3996 18.2554 21.4124 18.2883 21.4187C18.3213 21.425 18.3552 21.4247 18.388 21.4177C18.6692 21.4002 18.9527 21.4177 19.2363 21.4177C19.5012 21.4177 19.6552 21.5344 19.6494 21.7165C19.6435 21.8985 19.4965 22.0023 19.2421 22.0023H4.87457C4.81622 22.0023 4.75788 22.0023 4.70071 22.0023C4.4895 21.9953 4.35065 21.8728 4.35065 21.7036C4.35065 21.5344 4.4965 21.4201 4.71354 21.4177C5.01109 21.4177 5.30864 21.4061 5.60502 21.4177C5.67104 21.4321 5.74006 21.42 5.79723 21.384C5.85441 21.348 5.89516 21.2909 5.91074 21.2252C7.22852 17.6593 8.55096 14.0941 9.87807 10.5298C9.89907 10.4749 9.91658 10.4131 9.93991 10.3641C9.9686 10.2803 10.0292 10.2114 10.1086 10.1723C10.188 10.1331 10.2796 10.127 10.3635 10.1552C10.4052 10.1634 10.4446 10.181 10.4786 10.2065C10.5127 10.232 10.5406 10.2649 10.5602 10.3027C10.5798 10.3405 10.5906 10.3822 10.5919 10.4247C10.5932 10.4672 10.585 10.5095 10.5677 10.5484C10.402 11 10.2316 11.4516 10.0683 11.8973C8.91696 14.9988 7.76566 18.1004 6.61436 21.2019C6.58752 21.2625 6.56768 21.3244 6.54318 21.4131Z" />
      <path d="M12.0041 6.65344C11.8804 6.65344 11.7579 6.66044 11.6354 6.65344C11.5558 6.65694 11.478 6.62886 11.419 6.57533C11.36 6.52179 11.3245 6.44712 11.3203 6.36756C11.3197 6.29059 11.3495 6.2165 11.4033 6.16142C11.457 6.10634 11.5304 6.07474 11.6074 6.07351C11.8666 6.05893 12.1264 6.05893 12.3857 6.07351C12.4252 6.07442 12.4643 6.08315 12.5004 6.09922C12.5366 6.11528 12.5693 6.13835 12.5965 6.1671C12.6238 6.19585 12.645 6.2297 12.6591 6.26671C12.6732 6.30372 12.6798 6.34315 12.6785 6.38273C12.6731 6.45929 12.638 6.53071 12.5807 6.58172C12.5233 6.63274 12.4483 6.65932 12.3716 6.65578C12.2491 6.65811 12.1266 6.65344 12.0041 6.65344Z" />
      <path d="M14.0963 6.65461C13.9796 6.65461 13.8512 6.65461 13.7287 6.65461C13.649 6.65842 13.5711 6.63045 13.512 6.57685C13.453 6.52325 13.4176 6.4484 13.4137 6.36873C13.4158 6.28896 13.4489 6.21316 13.506 6.1574C13.563 6.10163 13.6396 6.07029 13.7194 6.07001C13.9714 6.05951 14.2246 6.05834 14.4767 6.07001C14.5162 6.07092 14.5552 6.07961 14.5914 6.09559C14.6275 6.11156 14.6602 6.13451 14.6875 6.16311C14.7148 6.19172 14.7362 6.22543 14.7505 6.26231C14.7648 6.29919 14.7717 6.33853 14.7707 6.37806C14.765 6.45461 14.7299 6.52597 14.6726 6.57712C14.6154 6.62826 14.5405 6.65521 14.4638 6.65228C14.3472 6.65811 14.2188 6.65228 14.0963 6.65228V6.65461Z" />
      <path d="M7.8384 6.06651C7.95509 6.06651 8.07177 6.05834 8.18846 6.06651C8.26787 6.06645 8.34421 6.09718 8.40144 6.15223C8.45866 6.20728 8.49232 6.28238 8.49534 6.36173C8.49526 6.4013 8.48708 6.44044 8.47133 6.47675C8.45558 6.51305 8.43257 6.54576 8.40373 6.57285C8.37488 6.59995 8.34081 6.62087 8.30359 6.63432C8.26637 6.64778 8.2268 6.65349 8.18729 6.65111C7.94225 6.65889 7.69721 6.65889 7.45217 6.65111C7.37264 6.65304 7.29549 6.6239 7.2371 6.56987C7.17871 6.51583 7.14368 6.44117 7.13945 6.36173C7.14557 6.28236 7.18118 6.20816 7.23928 6.15373C7.29737 6.09931 7.37374 6.06861 7.45334 6.06768C7.57819 6.05834 7.70888 6.06534 7.8384 6.06651Z" />
      <path d="M9.91773 6.06534C10.0344 6.06534 10.1511 6.05951 10.2678 6.06534C10.3508 6.06346 10.4311 6.09438 10.4914 6.15141C10.5517 6.20843 10.5871 6.28695 10.5898 6.3699C10.5878 6.40951 10.5778 6.44832 10.5605 6.48403C10.5433 6.51974 10.519 6.55164 10.4892 6.57784C10.4594 6.60404 10.4247 6.62402 10.3871 6.6366C10.3494 6.64919 10.3097 6.65412 10.2701 6.65111C10.0321 6.65889 9.79405 6.65889 9.55601 6.65111C9.47629 6.65541 9.39798 6.62883 9.33735 6.5769C9.27673 6.52496 9.23844 6.45166 9.23045 6.37223C9.23519 6.28946 9.27121 6.21158 9.33123 6.15438C9.39125 6.09717 9.47077 6.06493 9.55367 6.06418H9.92124L9.91773 6.06534Z" />
      <path d="M16.1768 6.65344C16.0601 6.65344 15.9306 6.65344 15.8092 6.65344C15.7713 6.65532 15.7335 6.64962 15.6978 6.63666C15.6622 6.62371 15.6295 6.60377 15.6017 6.578C15.5739 6.55224 15.5515 6.52119 15.5358 6.48665C15.5201 6.45212 15.5115 6.4148 15.5105 6.3769C15.5088 6.33747 15.515 6.29809 15.5289 6.26114C15.5428 6.22419 15.564 6.19042 15.5912 6.16187C15.6185 6.13332 15.6512 6.11056 15.6875 6.09498C15.7237 6.07939 15.7628 6.0713 15.8022 6.07118C16.0543 6.05834 16.3075 6.05951 16.5595 6.07118C16.639 6.07263 16.715 6.10455 16.7716 6.16035C16.8283 6.21615 16.8614 6.29158 16.8641 6.37106C16.8559 6.44997 16.8187 6.523 16.7595 6.57587C16.7004 6.62874 16.6237 6.65765 16.5443 6.65694H16.1768V6.65344Z" />
    </SvgIcon>
  );
});

export default IconUfo;
