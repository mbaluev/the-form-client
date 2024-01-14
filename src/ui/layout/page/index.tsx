import { FC, Fragment } from 'react';
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
  gridTemplateColumns?: string;
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
    gridTemplateColumns = '1fr 1fr',
  } = props;

  const clsWrapper = classNames('page__wrapper');
  const cls = classNames('page', className);
  const clsTop = classNames('page__top');
  const clsTopRow = classNames('page__top-row');
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
        {breadCrumbsLoading ? <BreadCrumbsSkeleton /> : <BreadCrumbs breadCrumbs={breadCrumbs} />}
      </div>
    );
  };
  const PageRenderer = () => {
    return (
      <div className={cls}>
        {(subTitle || title || quickFilter) && (
          <div className={clsTop}>
            <div className={clsTopRow}>
              <div className={clsTopColumn}>{title && <div className={clsTitle}>{title}</div>}</div>
              {quickFilter && (
                <div className={clsTopColumn}>
                  <div className={clsQuickFilter}>{quickFilter}</div>
                </div>
              )}
            </div>
            {subTitle && (
              <div className={clsTopRow}>
                <div className={clsTopColumn}>
                  {subTitle && <div className={clsSubTitle}>{subTitle}</div>}
                </div>
              </div>
            )}
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
      <Fragment>
        <BreadCrumbsRenderer />
        <div className={clsWrapper} style={{ gridTemplateColumns }}>
          <PageRenderer />
          {pageRight}
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <BreadCrumbsRenderer />
      <PageRenderer />
    </Fragment>
  );
};
