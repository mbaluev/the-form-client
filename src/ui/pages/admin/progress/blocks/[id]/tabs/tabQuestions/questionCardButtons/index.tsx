import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Box, Grid } from '@mui/material';
import { Button } from '@components/button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';

export const QuestionCardButtons = observer(() => {
  const { isPrev, isNext, prev, next } = useViewModel<IQuestionAdminViewModel>(
    VIEW_MODEL.QuestionAdmin
  );

  const handlePrev = () => prev();
  const handleNext = () => next();

  return (
    <Box>
      <Grid container spacing={3}>
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
      </Grid>
    </Box>
  );
});
