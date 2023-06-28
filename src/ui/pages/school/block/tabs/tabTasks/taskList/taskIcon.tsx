import { Tooltip } from '@components/tooltip';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  complete?: boolean;
  sent?: boolean;
  style?: object;
}

export const TaskIcon = (props: IProps) => {
  const { complete, sent, style } = props;
  let icon = (
    <Tooltip title="Todo">
      <RadioButtonUncheckedIcon className="color_grey-50" style={style} />
    </Tooltip>
  );
  if (sent === false)
    icon = (
      <Tooltip title="Income">
        <CallReceivedRoundedIcon className="color_red" style={style} />
      </Tooltip>
    );
  if (sent === true)
    icon = (
      <Tooltip title="Sent">
        <CallMadeRoundedIcon className="color_blue" style={style} />
      </Tooltip>
    );
  if (complete)
    icon = (
      <Tooltip title="Complete">
        <CheckCircleIcon className="color_green" style={style} />
      </Tooltip>
    );
  return icon;
};
