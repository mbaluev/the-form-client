import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { Grid } from '@mui/material';
import { Button } from '@components/button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Tooltip } from '@components/tooltip';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

export const QuestionCardButtons = observer(() => {
  const { isPrev, isNext, isFinish, prev, next, finish } =
    useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

  const handlePrev = () => prev();
  const handleNext = () => next();
  const handleFinish = () => finish();

  return (
    <Grid container spacing="15px">
      <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          disabled={!isPrev}
          onClick={handlePrev}
        >
          Prev
        </Button>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          endIcon={<ArrowForwardIcon />}
          disabled={!isNext}
          onClick={handleNext}
        >
          Next
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Tooltip title="When clicked you won't be able to change you answers any more">
          <Button
            color="green"
            startIcon={<SportsScoreIcon />}
            disabled={!isFinish}
            onClick={handleFinish}
          >
            Finish (send your answers)
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
});
