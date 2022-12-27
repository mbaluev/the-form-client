import React, { FC, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandMore';
import ExpandMore from '@mui/icons-material/ExpandLess';
import { classNames } from '@utils/classNames';
import './index.scss';

export interface IFormSectionProps {
  id?: string;
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  titleClassName?: string;
  align?: string;
  className?: string;
  rightBlock?: JSX.Element;
  collapsible?: boolean;
  isOpen?: boolean;
  cols?: number;
}

export const FormSection: FC<IFormSectionProps> = ({
  id,
  title,
  subtitle,
  titleClassName,
  align,
  className,
  rightBlock,
  collapsible,
  isOpen = true,
  cols,
  children,
}) => {
  const [isCollapse, setIsCollapse] = useState<boolean | undefined>(!isOpen);

  const clsMain = classNames('form-section', className, {
    'form-section_collapsible': Boolean(collapsible),
    'form-section_collapsed': Boolean(isCollapse),
  });

  const clsTitle = classNames('form-section__title', titleClassName);

  const clsContent = classNames('form-section__content', {
    [`form-section__content_${align}`]: Boolean(align),
    'form-section__content_collapsed': Boolean(collapsible && isCollapse),
    [`cols_${cols}`]: Boolean(cols),
  });

  const collapseClick = () => {
    if (collapsible) setIsCollapse(!isCollapse);
  };

  const FormSectionTitleText = () => {
    if (title) {
      return (
        <div className="form-section__title-left-text">
          <label className="form-section__label">{title}</label>
        </div>
      );
    }
    return <div className="form-section__title-left-text" />;
  };
  const FormSectionTitleCollapse = () => {
    if (collapsible) {
      return (
        <div className="form-section__title-left-collapse">
          {isCollapse ? <ExpandMore /> : <ExpandLess />}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={clsMain} id={id}>
      {title || rightBlock ? (
        <div className={clsTitle}>
          <div className="form-section__title-left" onClick={collapseClick}>
            <FormSectionTitleText />
            <FormSectionTitleCollapse />
          </div>
          {rightBlock && (
            <div className="form-section__title-right">{rightBlock}</div>
          )}
        </div>
      ) : null}
      {subtitle && <div className="form-section__subtitle">{subtitle}</div>}
      <div className={clsContent}>{children}</div>
    </div>
  );
};
