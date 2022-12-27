import React from 'react';
import { observer } from 'mobx-react';
import { useLocale } from '@hooks/useLocale';
import { Form, FormField, FormSection } from '@components/form';
import countries from '@utils/locale/country';
import languages from '@utils/locale/language';
import timeZones from '@utils/locale/timeZone';
import timeSettings from '@utils/locale/timeSettings';
import {
  AutocompleteFieldControl,
  getSelectItemsFromDictionary,
  TextFieldControl,
} from '@components/fields';
import { Divider } from '@mui/material';

export const ProfileLocale = observer(() => {
  const {
    locale,
    format,
    country,
    hourCycle,
    timeZone,
    changeFormat,
    changeCountry,
    changeHourCycle,
    changeTimeZone,
    sample,
  } = useLocale();

  return (
    <Form cols={2}>
      <FormSection>
        <FormField isRow title="Locale">
          {locale}
        </FormField>
        <FormField isRow title="Location">
          <AutocompleteFieldControl
            value={country}
            options={countries.selectItems}
            onChange={(value) => {
              if (value) changeCountry(value.value);
            }}
            disableClearable
          />
        </FormField>
        <FormField isRow title="Format">
          <AutocompleteFieldControl
            value={format}
            options={languages.selectItems}
            onChange={(value) => {
              if (value) changeFormat(value.value);
            }}
            disableClearable
          />
        </FormField>
        <Divider />
        <FormField isRow title="Time format">
          <AutocompleteFieldControl
            value={hourCycle}
            options={getSelectItemsFromDictionary(
              timeSettings.hourCycle.selectItems
            )}
            onChange={(value: any) => {
              if (value) changeHourCycle(value.value);
            }}
            disableClearable
          />
        </FormField>
        <FormField isRow title="Timezone">
          <AutocompleteFieldControl
            value={timeZone}
            options={timeZones.selectItems}
            onChange={(value: any) => {
              if (value) changeTimeZone(value.value);
            }}
            disableClearable
          />
          <div
            className="link"
            onClick={() => {
              changeTimeZone();
            }}
          >
            Use current timezone
          </div>
        </FormField>
        <Divider />
        <FormField isRow title="Numbers">
          <TextFieldControl disabled value={sample?.number} />
        </FormField>
        <FormField isRow title="Date">
          <TextFieldControl disabled value={sample?.date} />
        </FormField>
        <FormField isRow title="Time">
          <TextFieldControl disabled value={sample?.time} />
        </FormField>
      </FormSection>
    </Form>
  );
});
