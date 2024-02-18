import { observer } from 'mobx-react';
import { FormField } from '@components/form/field';
import { Grid } from '@mui/material';
import { Input } from '@ui/fields/input';

export const Form = observer(() => {
  const spacing = 3;

  // const { control } = useFormContext<IMaterialDTO>();
  // const name = useWatch({ control, name: 'block.name' });
  // console.log(name);

  return (
    <Grid container spacing={spacing} alignItems="flex-start">
      <Grid item xs={12}>
        <FormField title="Block">
          <Input name="block.title" disabled />
        </FormField>
      </Grid>
    </Grid>
  );
});
