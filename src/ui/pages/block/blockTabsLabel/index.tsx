import React from 'react';
import { classNames } from '@utils/classNames';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { IBlockTabDTO } from '@model/block';
import './index.scss';

interface IModuleTabLabelProps {
  tab: IBlockTabDTO;
}

export const BlockTabsLabel = (props: IModuleTabLabelProps) => {
  const { tab } = props;
  const cls = classNames('block-tabs-label', {
    'block-tabs-label_complete': tab.complete,
  });
  return (
    <div className={cls}>
      <div className="block-tabs-label__icon">
        {tab.complete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </div>
      <div className="block-tabs-label__label">{tab.label}</div>
    </div>
  );
};
