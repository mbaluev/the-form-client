import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Tooltip } from '@components/tooltip';
import { IQuestionUserDTO } from '@model/entities/question';
import { observer } from 'mobx-react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React, { Fragment } from 'react';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';

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
  if (data && data.questionAnswers.length > 0)
    icon = (
      <Tooltip title="Selected">
        <CheckCircleIcon className="color_grey-50" style={style} />
      </Tooltip>
    );
  if (data && data.complete)
    icon = (
      <Tooltip title="Complete">
        <CheckCircleIcon className="color_green" style={style} />
      </Tooltip>
    );
  if (data && data.error)
    icon = (
      <Fragment>
        <Tooltip title="Failed">
          <InfoOutlinedIcon className="color_red" style={style} />
        </Tooltip>
        {data.comment && (
          <Tooltip title="Has a comments">
            <MarkChatUnreadOutlinedIcon className="color_red" style={style} />
          </Tooltip>
        )}
      </Fragment>
    );
  return icon;
});
