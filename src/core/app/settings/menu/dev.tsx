import { TMenuItemDTO } from 'controller/model/common/menu';
import { ROUTER_CONST_DEV } from '@app/settings/routerConst/dev';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LaunchIcon from '@mui/icons-material/Launch';
import TabIcon from '@mui/icons-material/Tab';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CopyrightIcon from '@mui/icons-material/Copyright';

export const MENU_CONFIG_DEV: TMenuItemDTO[] = [
  {
    name: ROUTER_CONST_DEV.home.name,
    label: ROUTER_CONST_DEV.home.label,
    icon: <AllInclusiveIcon />,
    path: ROUTER_CONST_DEV.home.path,
  },
  {
    name: 'fields',
    label: 'fields',
    icon: <TextFieldsIcon />,
    items: [
      {
        name: ROUTER_CONST_DEV.autocomplete.name,
        label: ROUTER_CONST_DEV.autocomplete.label,
        path: ROUTER_CONST_DEV.autocomplete.path,
      },
      {
        name: ROUTER_CONST_DEV.checkbox.name,
        label: ROUTER_CONST_DEV.checkbox.label,
        path: ROUTER_CONST_DEV.checkbox.path,
      },
      {
        name: ROUTER_CONST_DEV.date.name,
        label: ROUTER_CONST_DEV.date.label,
        path: ROUTER_CONST_DEV.date.path,
      },
      {
        name: ROUTER_CONST_DEV.month_range.name,
        label: ROUTER_CONST_DEV.month_range.label,
        path: ROUTER_CONST_DEV.month_range.path,
      },
      {
        name: ROUTER_CONST_DEV.multi_select.name,
        label: ROUTER_CONST_DEV.multi_select.label,
        path: ROUTER_CONST_DEV.multi_select.path,
      },
      {
        name: ROUTER_CONST_DEV.multi_select_ext.name,
        label: ROUTER_CONST_DEV.multi_select_ext.label,
        path: ROUTER_CONST_DEV.multi_select_ext.path,
      },
      {
        name: ROUTER_CONST_DEV.password.name,
        label: ROUTER_CONST_DEV.password.label,
        path: ROUTER_CONST_DEV.password.path,
      },
      {
        name: ROUTER_CONST_DEV.radio.name,
        label: ROUTER_CONST_DEV.radio.label,
        path: ROUTER_CONST_DEV.radio.path,
      },
      {
        name: ROUTER_CONST_DEV.range.name,
        label: ROUTER_CONST_DEV.range.label,
        path: ROUTER_CONST_DEV.range.path,
      },
      {
        name: ROUTER_CONST_DEV.select.name,
        label: ROUTER_CONST_DEV.select.label,
        path: ROUTER_CONST_DEV.select.path,
      },
      {
        name: ROUTER_CONST_DEV.slider.name,
        label: ROUTER_CONST_DEV.slider.label,
        path: ROUTER_CONST_DEV.slider.path,
      },
      {
        name: ROUTER_CONST_DEV.switch.name,
        label: ROUTER_CONST_DEV.switch.label,
        path: ROUTER_CONST_DEV.switch.path,
      },
      {
        name: ROUTER_CONST_DEV.tag.name,
        label: ROUTER_CONST_DEV.tag.label,
        path: ROUTER_CONST_DEV.tag.path,
      },
      {
        name: ROUTER_CONST_DEV.text.name,
        label: ROUTER_CONST_DEV.text.label,
        path: ROUTER_CONST_DEV.text.path,
      },
      {
        name: ROUTER_CONST_DEV.toggle.name,
        label: ROUTER_CONST_DEV.toggle.label,
        path: ROUTER_CONST_DEV.toggle.path,
      },
    ],
  },
  {
    name: 'forms',
    label: 'forms',
    icon: <NewspaperIcon />,
    items: [
      {
        name: ROUTER_CONST_DEV.form_cols.name,
        label: ROUTER_CONST_DEV.form_cols.label,
        path: ROUTER_CONST_DEV.form_cols.path,
      },
      {
        name: ROUTER_CONST_DEV.form_section_cols.name,
        label: ROUTER_CONST_DEV.form_section_cols.label,
        path: ROUTER_CONST_DEV.form_section_cols.path,
      },
      {
        name: ROUTER_CONST_DEV.form_field_row.name,
        label: ROUTER_CONST_DEV.form_field_row.label,
        path: ROUTER_CONST_DEV.form_field_row.path,
      },
    ],
  },
  {
    name: ROUTER_CONST_DEV.button.name,
    label: ROUTER_CONST_DEV.button.label,
    icon: <SmartButtonIcon />,
    path: ROUTER_CONST_DEV.button.path,
  },
  {
    name: ROUTER_CONST_DEV.icon_button.name,
    label: ROUTER_CONST_DEV.icon_button.label,
    icon: <CopyrightIcon />,
    path: ROUTER_CONST_DEV.icon_button.path,
  },
  {
    name: ROUTER_CONST_DEV.accordion.name,
    label: ROUTER_CONST_DEV.accordion.label,
    icon: <MenuOpenIcon />,
    path: ROUTER_CONST_DEV.accordion.path,
  },
  {
    name: ROUTER_CONST_DEV.dialog.name,
    label: ROUTER_CONST_DEV.dialog.label,
    icon: <LaunchIcon />,
    path: ROUTER_CONST_DEV.dialog.path,
  },
  {
    name: ROUTER_CONST_DEV.tab.name,
    label: ROUTER_CONST_DEV.tab.label,
    icon: <TabIcon />,
    items: [
      {
        name: ROUTER_CONST_DEV.tab.name,
        label: ROUTER_CONST_DEV.tab.label,
        path: ROUTER_CONST_DEV.tab.path,
      },
      {
        name: ROUTER_CONST_DEV.tab_vertical.name,
        label: ROUTER_CONST_DEV.tab_vertical.label,
        path: ROUTER_CONST_DEV.tab_vertical.path,
      },
    ],
  },
  {
    name: ROUTER_CONST_DEV.attachment.name,
    label: ROUTER_CONST_DEV.attachment.label,
    icon: <AttachmentIcon />,
    path: ROUTER_CONST_DEV.attachment.path,
  },
];
