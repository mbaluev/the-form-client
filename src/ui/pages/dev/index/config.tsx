import { IContentItemProps } from '@components/content';
import { CheckboxFieldControls } from '@ui/pages/dev/fields/checkboxFieldControls';
import { SliderFieldControls } from '@ui/pages/dev/fields/sliderFieldControls';
import { DateFieldControls } from '@ui/pages/dev/fields/dateFieldControls';
import { MonthRangeFieldControls } from '@ui/pages/dev/fields/monthRangeFieldControls';
import { MultiSelectExtFieldControls } from '@ui/pages/dev/fields/multiSelectExtFieldControls';
import { MultiSelectFieldControls } from '@ui/pages/dev/fields/multiSelectFieldControls';
import { PasswordFieldControls } from '@ui/pages/dev/fields/passwordFieldControls';
import { RadioGroupFieldControls } from '@ui/pages/dev/fields/radioGroupFieldControls';
import { SelectFieldControls } from '@ui/pages/dev/fields/selectFieldControls';
import { RangeFieldControls } from '@ui/pages/dev/fields/rangeFieldControls';
import { SwitchFieldControls } from '@ui/pages/dev/fields/switchFieldControls';
import { TagFieldControls } from '@ui/pages/dev/fields/tagFieldControls';
import { TextFieldControls } from '@ui/pages/dev/fields/textFieldControls';
import { ToggleButtonControls } from '@ui/pages/dev/fields/toggleButtonControls';
import { AutocompleteFieldControls } from '@ui/pages/dev/fields/autocompleteFieldControls';

export const CONFIG: IContentItemProps[] = [
  {
    id: 'autocomplete',
    label: 'Autocomplete',
    content: <AutocompleteFieldControls id="autocomplete" />,
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    content: <CheckboxFieldControls id="checkbox" />,
  },
  {
    id: 'date',
    label: 'Date',
    content: <DateFieldControls id="date" />,
  },
  {
    id: 'month-range',
    label: 'MonthRange',
    content: <MonthRangeFieldControls id="month-range" />,
  },
  {
    id: 'multi-select',
    label: 'MultiSelect',
    content: <MultiSelectFieldControls id="multi-select" />,
  },
  {
    id: 'multi-select-ext',
    label: 'MultiSelectExt',
    content: <MultiSelectExtFieldControls id="multi-select-ext" />,
  },
  {
    id: 'password',
    label: 'Password',
    content: <PasswordFieldControls id="password" />,
  },
  {
    id: 'radio',
    label: 'Radio',
    content: <RadioGroupFieldControls id="radio" />,
  },
  {
    id: 'range',
    label: 'Range',
    content: <RangeFieldControls id="range" />,
  },
  {
    id: 'select',
    label: 'Select',
    content: <SelectFieldControls id="select" />,
  },
  {
    id: 'slider',
    label: 'Slider',
    content: <SliderFieldControls id="slider" />,
  },
  {
    id: 'switch',
    label: 'Switch',
    content: <SwitchFieldControls id="switch" />,
  },
  {
    id: 'tag',
    label: 'Tag',
    content: <TagFieldControls id="tag" />,
  },
  {
    id: 'text',
    label: 'Text',
    content: <TextFieldControls id="text" />,
  },
  {
    id: 'toggle',
    label: 'Toggle',
    content: <ToggleButtonControls id="toggle" />,
  },
];
