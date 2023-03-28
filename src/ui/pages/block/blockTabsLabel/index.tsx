import React from 'react';
import { classNames } from '@utils/classNames';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
        {complete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </div>
      <div className="block-tabs-label__label">{label}</div>
    </div>
  );
};
