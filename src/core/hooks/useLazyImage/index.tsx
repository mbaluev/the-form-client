import React from 'react';
import { default as NextImage } from 'next/image';
import { classNames } from '@utils/classNames';
import { IMediaDTO } from 'controller/model/common/media';
import './index.scss';

export const useLazyImage = (media: IMediaDTO) => {
  interface ILazyImageProps {
    className?: string;
  }

  const LazyImage = (props: ILazyImageProps) => {
    const { className } = props;
    const cls = classNames(className, 'lazy-image');
    return (
      <NextImage
        className={cls}
        src={media.url}
        alt={media.alt}
        layout="fill"
        objectFit="contain"
        priority={true}
      />
    );
  };

  return { LazyImage };
};
