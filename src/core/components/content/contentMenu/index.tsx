import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '@utils/classNames';
import { IContentProps } from '@components/content';
import './index.scss';

export const ContentMenu = (props: IContentProps) => {
  const { items, activeItem, offsetTop } = props;

  const cls = classNames('content__menu', {
    content__menu__padding: typeof offsetTop === 'number',
  });

  const router = useRouter();

  return (
    <div className={cls}>
      <ul style={{ top: offsetTop }}>
        {items.map((item, index) => {
          const clsItem = classNames('content__menu-item', {
            'content__menu-item_selected': activeItem === item.id,
          });
          return (
            <li key={index} className={clsItem}>
              <Link
                href={`${router.pathname.replace(
                  '[id]',
                  router.query.id as string
                )}/#${item.id}`}
                passHref
              >
                <div>{item.label}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
