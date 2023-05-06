import React from 'react';
import { classNames } from '@utils/classNames';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './index.scss';

interface IModuleTabLabelProps {
  label: string;
  complete?: boolean;
}

export const BlockTabsLabel = (props: IModuleTabLabelProps) => {
  const { label, complete } = props;
  const cls = classNames('block-tabs-label', {
    'block-tabs-label_complete': Boolean(complete),
  });
  return (
    <div className={cls}>
      <div className="block-tabs-label__icon">
        {complete ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
      </div>
      <div className="block-tabs-label__label">{label}</div>
    </div>
  );
};
