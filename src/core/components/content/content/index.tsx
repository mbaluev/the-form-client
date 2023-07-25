import React from 'react';
import useScrollSpy from '@hooks/useScrollSpy';
import { classNames } from '@utils/classNames';
import { ContentMenu, ContentPanels } from '@components/content';
import './index.scss';

export interface IContentItemProps {
  id: string;
  label: string;
  content?: JSX.Element | string;
  className?: string;
}

export interface IContentProps {
  items: IContentItemProps[];
  className?: string;
  offsetTop?: number;
  activeItem?: string;
  menuPosition?: 'right' | 'left';
}

export const Content = (props: IContentProps) => {
  const { items, offsetTop, menuPosition = 'left', className } = props;
  const { active } = useScrollSpy(items, offsetTop);
  const cls = classNames('content', className, {
    [`content_${menuPosition}`]: Boolean(menuPosition),
  });
  return (
    <div className={cls}>
      {menuPosition == 'left' && (
        <React.Fragment>
          <ContentMenu {...props} activeItem={active} />
          <ContentPanels {...props} activeItem={active} />
        </React.Fragment>
      )}
      {menuPosition == 'right' && (
        <React.Fragment>
          <ContentPanels {...props} activeItem={active} />
          <ContentMenu {...props} activeItem={active} />
        </React.Fragment>
      )}
    </div>
  );
};
