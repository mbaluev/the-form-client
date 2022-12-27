import React from 'react';
import { classNames } from '@utils/classNames';
import './index.scss';

export interface IToolbarProps {
  className?: string;
  itemsLeft?: JSX.Element[];
  itemsRight?: JSX.Element[];
}

export const Toolbar = (props: IToolbarProps) => {
  const { className, itemsLeft, itemsRight } = props;
  const cls = classNames('toolbar', className);
  const clsLeft = classNames('toolbar__left');
  const clsRight = classNames('toolbar__right');

  if (!itemsLeft && !itemsRight) return null;

  return (
    <div className={cls}>
      {itemsLeft && (
        <div className={clsLeft}>
          {itemsLeft.map((item, index) => {
            return React.cloneElement(item, { key: index });
          })}
        </div>
      )}
      {itemsRight && (
        <div className={clsRight}>
          {itemsRight.map((item, index) => {
            return React.cloneElement(item, { key: index });
          })}
        </div>
      )}
    </div>
  );
};
