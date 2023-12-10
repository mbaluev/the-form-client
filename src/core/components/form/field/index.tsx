import { CSSProperties, ReactElement, ReactNode } from 'react';
import { Tooltip } from '@theme/tooltip';
import { useTheme } from '@mui/material';
import { classNames } from '@utils/classNames';
import Typography from '@mui/material/Typography';
import classes from './index.module.scss';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export interface IFormFieldProps {
  title?: string | ReactElement | null;
  titleExtra?: string | ReactElement;
  titleQuestion?: string | null;
  tooltip?: string | null;
  required?: boolean;
  disabled?: boolean;
  align?: 'left' | 'right';
  style?: CSSProperties;
  styleTitle?: CSSProperties;
  styleValue?: CSSProperties;
  children?: ReactNode;
}

export const FormField = (props: IFormFieldProps) => {
  const {
    title,
    titleExtra,
    titleQuestion,
    tooltip,
    required,
    disabled,
    align,
    style,
    styleTitle,
    styleValue,
    children,
  } = props;
  const theme = useTheme();
  const clsTitle = classNames(classes.field_title, {
    [classes.field_title_left]: align === 'left',
    [classes.field_title_right]: align === 'right',
  });
  const clsTitleText = classNames(classes.field_title_text, {
    [classes.field_title_text_disabled]: Boolean(disabled),
  });
  const clsValue = classNames(classes.field_value, {
    [classes.field_value_block]: typeof children === 'string',
    [classes.field_value_left]: align === 'left',
    [classes.field_value_right]: align === 'right',
  });
  return (
    <div className={classes.field} style={style}>
      {title && (
        <div className={clsTitle} style={styleTitle}>
          <Tooltip title={tooltip}>
            <div className={clsTitleText}>{title}</div>
          </Tooltip>
          {titleExtra && <div className={classes.field_title_text_extra}>{titleExtra}</div>}
          {titleQuestion && (
            <Tooltip title={titleQuestion}>
              <HelpOutlineOutlinedIcon className={classes.field_title_text_extra} />
            </Tooltip>
          )}
          {required && <Typography color={theme.palette.error.main}>*</Typography>}
        </div>
      )}
      <div className={clsValue} style={styleValue}>
        {children || '-'}
      </div>
    </div>
  );
};
