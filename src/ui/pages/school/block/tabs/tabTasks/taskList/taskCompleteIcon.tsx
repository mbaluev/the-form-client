import { Tooltip } from '@components/tooltip';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react';

interface IProps {
  complete?: boolean;
  style?: object;
}

export const TaskCompleteIcon = (props: IProps) => {
  const { complete, style } = props;
  let icon = (
    <Tooltip title="Todo">
      <RadioButtonUncheckedIcon className="color_grey-50" style={style} />
    </Tooltip>
  );
  if (complete)
    icon = (
      <Tooltip title="Complete">
        <CheckCircleIcon className="color_blue" style={style} />
      </Tooltip>
    );
  return icon;
};
