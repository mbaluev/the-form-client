import * as React from 'react';
import { default as NextImage } from 'next/image';
import { Skeleton } from '@components/skeleton';
import './index.scss';

export interface IMenuAccountImageProps {
  loading?: boolean;
  src?: any;
  name?: string;
}

export const AccountImage = (props: IMenuAccountImageProps) => {
  const { loading, src, name } = props;
  return loading ? (
    <Skeleton className="account-image" />
  ) : src ? (
    <NextImage src={src} layout="fill" objectFit="contain" priority={true} />
  ) : (
    <div>{name?.substring(0, 1)}</div>
  );
};
