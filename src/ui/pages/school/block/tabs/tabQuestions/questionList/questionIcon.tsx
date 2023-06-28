import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Tooltip } from '@components/tooltip';
import { IQuestionUserDTO } from '@model/entities/question';
import { observer } from 'mobx-react';

interface IProps {
  data?: IQuestionUserDTO | null;
  style?: object;
}

export const QuestionIcon = observer((props: IProps) => {
  const { data, style } = props;
  let icon = (
    <Tooltip title="Todo">
      <RadioButtonUncheckedIcon className="color_grey-50" style={style} />
    </Tooltip>
  );
  if (data && data.complete === null && data.questionAnswers.length > 0)
    icon = (
      <Tooltip title="Selected">
        <CheckCircleIcon className="color_grey-50" style={style} />
      </Tooltip>
    );
  if (data && data.complete === true)
    icon = (
      <Tooltip title="Complete">
        <CheckIcon className="color_blue" style={style} />
      </Tooltip>
    );
  if (data && data.complete === false)
    icon = (
      <Tooltip title="Failed">
        <ErrorOutlineIcon className="color_red" style={style} />
      </Tooltip>
    );
  return icon;
});
