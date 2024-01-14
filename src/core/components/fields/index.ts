import './index.scss';
import { classNames } from '@utils/classNames';

export type BaseFieldControlProps<T> = Omit<T, 'size'> & {
  isEdit?: boolean;
  loading?: boolean;
  className?: string;
  error?: boolean;
  helperText?: string | null;
  focused?: boolean;
  disabled?: boolean;
  heightAuto?: boolean;
  emptyLabel?: string;
  size?: 'default' | 'medium' | 'small' | 'x-small';
};

export const fieldControlClassNames = <T>(props: BaseFieldControlProps<T>, className?: string) => {
  const {
    className: classNameProps,
    isEdit = true,
    loading,
    error,
    focused,
    disabled,
    heightAuto,
    size,
  } = props;

  return classNames(className, 'field-control', classNameProps, {
    'field-control_is-edit': !Boolean(loading) && Boolean(isEdit),
    'field-control_is-view': !Boolean(loading) && !Boolean(isEdit),
    'field-control_is-loading': Boolean(loading),
    'field-control_error': Boolean(error),
    'field-control_focused': Boolean(focused),
    'field-control_disabled': Boolean(disabled),
    'field-control_height_auto': Boolean(heightAuto),
    [`field-control_size_${size}`]: Boolean(size),
  });
};

export * from './AutocompleteFieldControl';
export * from './CheckboxFieldControl';
export * from './DateFieldControl';
export * from './MonthRangeFieldControl';
export * from './MultiSelectExtFieldControl';
export * from './MultiSelectFieldControl';
export * from './PasswordFieldControl';
export * from './RadioGroupFieldControl';
export * from './RangeFieldControl';
export * from './SelectFieldControl';
export * from './SkeletonFieldControl';
export * from './SliderFieldControl';
export * from './SwitchFieldControl';
export * from './TagFieldControl';
export * from './TextFieldControl';
export * from './ToggleButtonGroupFieldControl';
