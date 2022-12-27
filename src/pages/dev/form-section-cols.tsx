import { MasterDev } from '@ui/masters/masterDev';
import { Page } from '@ui/layout/page';
import { FormSectionColsControls } from '@ui/pages/dev/form/formSectionColsControls';

const FormSectionCols = () => {
  return (
    <Page title="Section with columns">
      <FormSectionColsControls />
    </Page>
  );
};

FormSectionCols.Layout = MasterDev;
export default FormSectionCols;
