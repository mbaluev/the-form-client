import { MasterDev } from '@ui/masters/masterDev';
import { Page } from '@ui/layout/page';
import { FormColsControls } from '@ui/pages/dev/form/formColsControls';

const FormCols = () => {
  return (
    <Page title="Form with columns">
      <FormColsControls />
    </Page>
  );
};

FormCols.Layout = MasterDev;
export default FormCols;
