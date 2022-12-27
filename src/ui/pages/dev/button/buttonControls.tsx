import React from 'react';
import { FormField, FormSection } from '@components/form';
import { Button } from '@components/button';

export const ButtonControls = () => {
  return (
    <FormSection cols={4}>
      <FormField title="1. Button outlined" align="left">
        <Button variant="outlined" disabled className="field-control">
          outlined disabled
        </Button>
        <Button variant="outlined" color="grey" className="field-control">
          outlined grey
        </Button>
        <Button variant="outlined" color="grey-light" className="field-control">
          outlined grey-light
        </Button>
        <Button variant="outlined" color="blue" className="field-control">
          outlined blue
        </Button>
        <Button variant="outlined" color="green" className="field-control">
          outlined green
        </Button>
        <Button variant="outlined" color="red" className="field-control">
          outlined red
        </Button>
        <Button variant="outlined" size="medium" className="field-control">
          outlined medium
        </Button>
        <Button variant="outlined" size="small" className="field-control">
          outlined small
        </Button>
        <Button variant="outlined" size="x-small" className="field-control">
          outlined x-small
        </Button>
      </FormField>
      <FormField title="2. Button contained" align="left">
        <Button variant="outlined" disabled className="field-control">
          contained disabled
        </Button>
        <Button variant="contained" color="grey" className="field-control">
          contained grey
        </Button>
        <Button
          variant="contained"
          color="grey-light"
          className="field-control"
        >
          contained grey-light
        </Button>
        <Button variant="contained" color="blue" className="field-control">
          contained blue
        </Button>
        <Button variant="contained" color="green" className="field-control">
          contained green
        </Button>
        <Button variant="contained" color="red" className="field-control">
          contained red
        </Button>
        <Button variant="contained" size="medium" className="field-control">
          contained medium
        </Button>
        <Button variant="contained" size="small" className="field-control">
          contained small
        </Button>
        <Button variant="contained" size="x-small" className="field-control">
          contained x-small
        </Button>
      </FormField>
      <FormField title="3. Button text" align="left">
        <Button variant="text" disabled className="field-control">
          text disabled
        </Button>
        <Button variant="text" color="grey" className="field-control">
          text grey
        </Button>
        <Button variant="text" color="grey-light" className="field-control">
          text grey-light
        </Button>
        <Button variant="text" color="blue" className="field-control">
          text blue
        </Button>
        <Button variant="text" color="green" className="field-control">
          text green
        </Button>
        <Button variant="text" color="red" className="field-control">
          text red
        </Button>
        <Button variant="text" size="medium" className="field-control">
          text medium
        </Button>
        <Button variant="text" size="small" className="field-control">
          text small
        </Button>
        <Button variant="text" size="x-small" className="field-control">
          text x-small
        </Button>
      </FormField>
    </FormSection>
  );
};
