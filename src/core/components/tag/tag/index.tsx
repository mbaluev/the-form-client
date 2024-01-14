import React, { MouseEvent } from 'react';
import { classNames } from '@utils/classNames';
import './index.scss';

export type ITagProps = {
  tag: any;
  color?: 'primary' | 'grey' | 'grey-dark' | 'blue' | 'green' | 'orange' | 'red';
  className?: string;
  checked?: boolean;
  active?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

export const Tag = (props: ITagProps) => {
  const { tag, color = 'primary', className, checked, active, onClick } = props;

  const cls = classNames('tag', className, `tag_color_${color}`, {
    tag_checked: Boolean(checked),
    tag_active: Boolean(active),
  });

  return (
    <div className={cls} onClick={onClick}>
      {tag}
    </div>
  );
};
