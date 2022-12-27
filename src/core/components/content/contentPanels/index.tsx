import React from 'react';
import { ContentPanel, IContentProps } from '@components/content';
import './index.scss';

export const ContentPanels = (props: IContentProps) => {
  const { items } = props;
  return (
    <div className="content__panels">
      {items.map((item) => {
        return (
          <ContentPanel key={item.id} {...item}>
            {item.content}
          </ContentPanel>
        );
      })}
    </div>
  );
};
