import { MasterDev } from '@ui/masters/masterDev';
import { Page } from '@ui/layout/page';
import { AutocompleteFieldControls } from '@ui/pages/dev/fields/autocompleteFieldControls';

const Autocomplete = () => {
  return (
    <Page title="Autocomplete">
      <AutocompleteFieldControls />
    </Page>
  );
};

Autocomplete.Layout = MasterDev;
export default Autocomplete;
