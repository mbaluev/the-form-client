import React, { FC } from 'react';
import { classNames } from '@utils/classNames';
import { BreadCrumb, TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { IconButton } from '@components/iconButton';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './index.scss';

interface IProps {
  className?: string;
  breadCrumbs?: TBreadCrumb[];
}

export const BreadCrumbs: FC<IProps> = (props) => {
  const { className, breadCrumbs } = props;
  const router = useRouter();
  const handleBack = () => router.back();
  const cls = classNames('bread-crumbs', className);
  return (
    <div className={cls}>
      <IconButton color="grey" size="small" onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      {breadCrumbs?.map((item, index, array) => (
        <BreadCrumb key={index} {...item} last={index === array.length - 1} />
      ))}
    </div>
  );
};
