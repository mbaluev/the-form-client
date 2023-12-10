import { SelectProps } from '@mui/material/Select/Select';
import { ISelectItem } from '@components/fields/selectField/types';

export type MultiSelectFieldProps<ItemType> = Omit<
  SelectProps,
  'onChange' | 'onSelect' | 'onClose' | 'onOpen' | 'value'
> & {
  value?: ItemType[keyof ItemType][];
  items?: ItemType[];
  dictionary?: ISelectItem[];
  valueField?: keyof ItemType;
  labelField?: keyof ItemType;
  countField?: keyof ItemType;
  helperText?: string;
  onSave?: (value?: unknown[], name?: string) => void;
  onChange?: (value?: unknown[], name?: string) => void;
  onSelect?: (value?: unknown[], name?: string) => void;
  onCancel?: (value?: unknown[], name?: string) => void;
  onClose?: (value?: unknown[], name?: string) => void;
  onOpen?: (value?: unknown[], name?: string) => void;
  loading?: boolean;
  totalLoading?: boolean;
  total?: number;
  totalHide?: boolean;
  autoClose?: boolean;
  showPopoverTitle?: boolean;
};

export type MultiSelectAsyncFieldProps<ItemType> = MultiSelectFieldProps<ItemType> & {
  loadItems: (name?: string) => Promise<ItemType[] | undefined>;
  loadTotal: (name?: string, value?: any[]) => Promise<number | undefined>;
};
