import React, { FC, useEffect, useState } from 'react';
import {
  Accordion as AccordionMui,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { classNames } from '@utils/classNames';
import './index.scss';

export type TAccordionColor = undefined | 'red' | 'green' | 'orange' | 'blue';
interface IProps {
  id?: string;
  title: string;
  className?: string;
  footer?: boolean;
  footerButtons?: JSX.Element[];
  expanded?: boolean;
  onExpand?: () => void;
  color: TAccordionColor;
}

export const Accordion: FC<IProps> = (props) => {
  const {
    id,
    title,
    className,
    children,
    footer,
    footerButtons,
    expanded: isExpanded,
    onExpand,
    color,
  } = props;
  const [expanded, setExpanded] = useState<boolean>(Boolean(isExpanded));

  useEffect(() => setExpanded(Boolean(isExpanded)), [isExpanded]);

  const cls = classNames('accordion', className, {
    accordion_expanded: expanded,
    [`accordion_${color}`]: Boolean(color),
  });

  const onChange = () => {
    if (onExpand) onExpand();
    else setExpanded(!expanded);
  };

  function AccordionFooter() {
    if (footerButtons && expanded) {
      return (
        <div className="accordion__footer">
          <div className="accordion__footer-buttons">
            {footerButtons?.map((item, index) => {
              return React.cloneElement(item, { key: index });
            })}
          </div>
        </div>
      );
    }
    if (footer && expanded) {
      return <div className="accordion__footer" />;
    }
    return null;
  }

  return (
    <div className={cls} id={id}>
      <AccordionMui expanded={expanded} onChange={onChange}>
        <AccordionSummary expandIcon={<ExpandMore />}>{title}</AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
        <AccordionFooter />
      </AccordionMui>
    </div>
  );
};
