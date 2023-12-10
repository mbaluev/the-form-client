import { CSSProperties, ReactElement, ReactNode } from 'react';
import classes from './index.module.scss';

export interface IFormSectionProps {
  title?: string | ReactElement;
  titleExtra?: string | ReactElement;
  style?: CSSProperties;
  children?: ReactNode;
}

export const FormSection = (props: IFormSectionProps) => {
  const { title, titleExtra, style, children } = props;
  return (
    <div className={classes.section} style={style}>
      {title && (
        <div className={classes.section_title}>
          <div className={classes.section_title_text}>{title}</div>
          {titleExtra && (
            <div className={classes.section_title_text_extra}>{titleExtra}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
