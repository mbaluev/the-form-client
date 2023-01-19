import React, { FC } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { classNames } from '@utils/classNames';
import { Tooltip } from '@components/tooltip';
import { Toolbar } from '@components/toolbar';
import './index.scss';

export interface IFormFieldProps {
  title?: string | JSX.Element;
  tooltip?: string;
  align?: string;
  isRow?: boolean;
  className?: string;
  classNameLabel?: string;
  classNameContent?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  actions?: JSX.Element[];
}

export const FormField: FC<IFormFieldProps> = (props) => {
  const {
    title,
    tooltip,
    align,
    isRow,
    className,
    classNameLabel,
    classNameContent,
    error,
    success,
    disabled,
    actions,
    children,
  } = props;

  const clsMain = classNames('form-field', className, {
    'form-field_row': Boolean(isRow),
    'form-field_disabled': Boolean(disabled),
  });
  const clsLabel = classNames('form-field__label', classNameLabel, {
    'form-field__label-error': Boolean(error),
    'form-field__label-success': Boolean(success),
  });
  const clsContent = classNames(
    'form-field__content',
    classNameContent,
    align ? `form-field__content_${align}` : undefined,
    { 'form-field__content_horizontal': Boolean(actions) }
  );

  return (
    <div className={clsMain}>
      {title && (
        <div className={clsLabel}>
          {tooltip && (
            <div className="form-field__label-svg">
              <Tooltip title={tooltip}>
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
          )}
          <div className="form-field__label-text">{title}</div>
        </div>
      )}
      {children && (
        <div className={clsContent}>
          {children}
          {actions && <Toolbar itemsLeft={actions} />}
        </div>
      )}
    </div>
  );
};
