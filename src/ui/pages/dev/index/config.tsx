import { IContentItemProps } from '@components/content';
import { ROUTER_CONST_DEV } from '@app/settings/routerConst/dev';
import Link from 'next/link';

export const CONFIG: IContentItemProps[] = [
  {
    id: 'autocomplete',
    label: 'Autocomplete',
    content: (
      <Link href={ROUTER_CONST_DEV.autocomplete.path}>
        {ROUTER_CONST_DEV.autocomplete.label}
      </Link>
    ),
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    content: (
      <Link href={ROUTER_CONST_DEV.checkbox.path}>
        {ROUTER_CONST_DEV.checkbox.label}
      </Link>
    ),
  },
  {
    id: 'date',
    label: 'Date',
    content: (
      <Link href={ROUTER_CONST_DEV.date.path}>
        {ROUTER_CONST_DEV.date.label}
      </Link>
    ),
  },
  {
    id: 'month-range',
    label: 'MonthRange',
    content: (
      <Link href={ROUTER_CONST_DEV.month_range.path}>
        {ROUTER_CONST_DEV.month_range.label}
      </Link>
    ),
  },
  {
    id: 'multi-select',
    label: 'MultiSelect',
    content: (
      <Link href={ROUTER_CONST_DEV.multi_select.path}>
        {ROUTER_CONST_DEV.multi_select.label}
      </Link>
    ),
  },
  {
    id: 'multi-select-ext',
    label: 'MultiSelectExt',
    content: (
      <Link href={ROUTER_CONST_DEV.multi_select_ext.path}>
        {ROUTER_CONST_DEV.multi_select_ext.label}
      </Link>
    ),
  },
  {
    id: 'password',
    label: 'Password',
    content: (
      <Link href={ROUTER_CONST_DEV.password.path}>
        {ROUTER_CONST_DEV.password.label}
      </Link>
    ),
  },
  {
    id: 'radio',
    label: 'Radio',
    content: (
      <Link href={ROUTER_CONST_DEV.radio.path}>
        {ROUTER_CONST_DEV.radio.label}
      </Link>
    ),
  },
  {
    id: 'range',
    label: 'Range',
    content: (
      <Link href={ROUTER_CONST_DEV.range.path}>
        {ROUTER_CONST_DEV.range.label}
      </Link>
    ),
  },
  {
    id: 'select',
    label: 'Select',
    content: (
      <Link href={ROUTER_CONST_DEV.select.path}>
        {ROUTER_CONST_DEV.select.label}
      </Link>
    ),
  },
  {
    id: 'slider',
    label: 'Slider',
    content: (
      <Link href={ROUTER_CONST_DEV.slider.path}>
        {ROUTER_CONST_DEV.slider.label}
      </Link>
    ),
  },
  {
    id: 'switch',
    label: 'Switch',
    content: (
      <Link href={ROUTER_CONST_DEV.switch.path}>
        {ROUTER_CONST_DEV.switch.label}
      </Link>
    ),
  },
  {
    id: 'tag',
    label: 'Tag',
    content: (
      <Link href={ROUTER_CONST_DEV.tag.path}>{ROUTER_CONST_DEV.tag.label}</Link>
    ),
  },
  {
    id: 'text',
    label: 'Text',
    content: (
      <Link href={ROUTER_CONST_DEV.text.path}>
        {ROUTER_CONST_DEV.text.label}
      </Link>
    ),
  },
  {
    id: 'toggle',
    label: 'Toggle',
    content: (
      <Link href={ROUTER_CONST_DEV.toggle.path}>
        {ROUTER_CONST_DEV.toggle.label}
      </Link>
    ),
  },
];
