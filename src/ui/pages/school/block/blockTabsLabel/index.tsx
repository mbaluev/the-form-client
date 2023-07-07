import React from 'react';
import { classNames } from '@utils/classNames';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './index.scss';
import { Tooltip } from '@components/tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';

interface IModuleTabLabelProps {
  label: string;
  complete?: boolean;
  error?: boolean;
  comment?: boolean;
}

export const BlockTabsLabel = (props: IModuleTabLabelProps) => {
  const { label, complete, error, comment } = props;
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
      {comment && (
        <Tooltip title="Has a comments">
          <MarkChatUnreadOutlinedIcon className="color_red" />
        </Tooltip>
      )}
    </div>
  );
};
