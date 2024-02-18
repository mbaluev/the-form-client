import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { Button } from '@mui/material';

export const Actions = observer(() => {
  const handleClose = async () => {};
  const handleSave = async () => {};
  return (
    <Fragment>
      <Button onClick={handleClose} variant="outlined" color="primary">
        Cancel
      </Button>
      <Button onClick={handleSave} variant="contained" color="primary">
        Create
      </Button>
    </Fragment>
  );
});
