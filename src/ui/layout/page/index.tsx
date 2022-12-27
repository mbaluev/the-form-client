import React, { FC } from 'react';
import { classNames } from '@utils/classNames';
import { BreadCrumbsSkeleton } from '@components/breadCrumbs/skeleton';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { BreadCrumbs } from '@components/breadCrumbs';
import './index.scss';

interface IProps {
  className?: string;
  title?: string | JSX.Element;
  subTitle?: string | JSX.Element;
  breadCrumbs?: TBreadCrumb[];
  breadCrumbsLoading?: boolean;
  quickFilter?: JSX.Element;
  padding?: boolean;
  pageRight?: JSX.Element;
}

export const Page: FC<IProps> = (props) => {
  const {
    className,
    subTitle,
    title,
    breadCrumbs,
    breadCrumbsLoading,
    quickFilter,
    children,
    padding = true,
    pageRight,
  } = props;

  const clsWrapper = classNames('page__wrapper');
  const cls = classNames('page', className);
  const clsTop = classNames('page__top');
  const clsTopColumn = classNames('page__top-column');
  const clsBreadCrumbs = classNames('page__bread-crumbs');
  const clsQuickFilter = classNames('page__quick-filter');
  const clsSubTitle = classNames('page__sub-title');
  const clsTitle = classNames('page__title');
  const clsContainer = classNames('page__container');
  const clsChildren = classNames('page__children', {
    page__children_padding: Boolean(padding),
  });

  const BreadCrumbsRenderer = () => {
    if (!breadCrumbs) return null;
    return (
      <div className={clsBreadCrumbs}>
        {breadCrumbsLoading ? (
          <BreadCrumbsSkeleton />
        ) : (
          <BreadCrumbs breadCrumbs={breadCrumbs} />
        )}
      </div>
    );
  };
  const PageRenderer = () => {
    return (
      <div className={cls}>
        {(subTitle || title || quickFilter) && (
          <div className={clsTop}>
            <div className={clsTopColumn}>
              {subTitle && <div className={clsSubTitle}>{subTitle}</div>}
              {title && <div className={clsTitle}>{title}</div>}
            </div>
            <div className={clsTopColumn}>
              <div className={clsQuickFilter}>{quickFilter}</div>
            </div>
          </div>
        )}
        <div className={clsContainer}>
          <div className={clsChildren}>{children}</div>
        </div>
      </div>
    );
  };

  if (pageRight) {
    return (
      <React.Fragment>
        <BreadCrumbsRenderer />
        <div className={clsWrapper}>
          <PageRenderer />
          {pageRight}
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <BreadCrumbsRenderer />
      <PageRenderer />
    </React.Fragment>
  );
};
