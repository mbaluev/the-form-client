import { MasterDev } from '@ui/masters/masterDev';
import { Page } from '@ui/layout/page';
import { FormFieldRowControls } from '@ui/pages/dev/form/formFieldRowControls';

const FormFieldRow = () => {
  return (
    <Page title="Fields horizontal">
      <FormFieldRowControls />
    </Page>
  );
};

FormFieldRow.Layout = MasterDev;
export default FormFieldRow;
