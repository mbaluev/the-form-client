import React from 'react';
import { classNames } from '@utils/classNames';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './index.scss';
import { Tooltip } from '@components/tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface IModuleTabLabelProps {
  label: string;
  complete?: boolean;
  error?: boolean;
}

export const BlockTabsLabel = (props: IModuleTabLabelProps) => {
  const { label, complete, error } = props;
  const cls = classNames('block-tabs-label', {
    'block-tabs-label_complete': Boolean(complete),
  });
  return (
    <div className={cls}>
      <div className="block-tabs-label__icon">
        {complete ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
      </div>
      <div className="block-tabs-label__label">{label}</div>
      {error && (
        <Tooltip title="Failed">
          <InfoOutlinedIcon className="color_red" />
        </Tooltip>
      )}
    </div>
  );
};
