import React, { useState, ChangeEvent, useMemo } from 'react';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Popover,
  Select,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { classNames } from '@utils/classNames';
import { stringCompare } from '@utils/string/stringCompare';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { Button } from '@components/button';
import {
  TextFieldControl,
  CheckboxFieldControl,
  multiSelectExtRenderValue,
  MultiSelectExtFieldControlProps,
} from '@components/fields';
import { IconButton } from '@components/iconButton';

const iconComponent = (hasState: boolean, open: boolean) => {
  return hasState ? () => null : open ? ExpandLessIcon : ExpandMoreIcon;
};

const endAdornment = (hasState: boolean, clear: () => void) => {
  return hasState ? (
    <IconButton onClick={clear}>
      <CloseIcon />
    </IconButton>
  ) : undefined;
};

export const MultiSelectExtFieldControlEdit = <ItemType,>(
  props: MultiSelectExtFieldControlProps<ItemType>
) => {
  const {
    className,
    variant,
    value,
    onChange,
    error,
    helperText,
    label,
    multiple,
    placeholder,
    displayEmpty,
    items,
    valueField = 'value' as keyof ItemType,
    labelField = 'label' as keyof ItemType,
    renderValue,
    renderOption,
    classNameMenu,
    onSave,
    onCancel,
    onClose,
    MenuProps,
    autoPopoverWidth,
    autoClose,
    displaySelectedFirst,
    displayCheckboxes = true,
    displaySearch = true,
    displayButtons = true,
    searchLabel = 'Search',
    cancelLabel = 'Cancel',
    clearLabel = 'Clear',
    selectLabel = 'Select',
    selectAllLabel = 'Select all',
    size,
    ...other
  } = props;

  const selectRef = React.useRef<HTMLDivElement>();

  const [open, setOpen] = useState<boolean>(false);
  const setClosed = () => setOpen(false);
  const setOpened = () => setOpen(true);

  const [state, setState] = useState<unknown[] | undefined>(value || []);
  useUpdateEffect(() => {
    setState(value || []);
  }, [value]);

  const cls = classNames(className, {
    'field-control_no-data': !state || state.length === 0,
  });

  const clsMenu = classNames(
    'select-field-control__menu',
    'multi-select-ext-field-control__menu',
    classNameMenu ? classNameMenu : undefined
  );

  const [searchText, setSearchText] = useState<string>('');
  const search = (item: ItemType, searchString: string) => {
    let ret = false;
    for (const key in item) {
      if (
        key !== valueField &&
        typeof item[key] === 'string' &&
        (item[key] as unknown as string)
          .toLowerCase()
          .indexOf(searchString.toLowerCase()) >= 0
      ) {
        ret = true;
      }
    }
    return ret;
  };
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const itemsFiltered = useMemo(() => {
    const fItems = items?.filter((item) => search(item, searchText));
    return displaySelectedFirst
      ? fItems
          ?.filter((_item) => state?.includes(_item[valueField]))
          .sort((a, b) =>
            stringCompare(String(a[valueField]), String(b[valueField]))
          )
          .concat(
            fItems?.filter((_item) => !state?.includes(_item[valueField]))
          )
      : fItems;
    // eslint-disable-next-line
  }, [searchText, state, items, valueField]);

  const onSaveHandler = () => {
    setClosed();
    setSearchText('');
    if (onSave) onSave(state, other.name);
  };
  const onCancelHandler = () => {
    setClosed();
    setSearchText('');
    if (onCancel) onCancel(state, other.name);
  };
  const onCloseHandler = () => {
    setClosed();
    setSearchText('');
    if (onClose) onClose(state, other.name);
  };
  const onChangeHandler = (onChangeValue: unknown) => {
    let values = [...(state || [])];
    if (multiple) {
      if (values.includes(onChangeValue)) {
        values = values.filter((v) => v !== onChangeValue);
      } else {
        values.push(onChangeValue);
      }
    } else {
      values = [onChangeValue];
    }
    setState(values);
    if (onChange) onChange(values, other.name);
    if (autoClose) setClosed();
  };

  const clearAll = () => {
    setSearchText('');
    setState([]);
    if (onChange) onChange([], other.name);
    if (autoClose) setClosed();
  };
  const selectAll = () => {
    const values = items?.map((d) => {
      return d[valueField];
    });
    setState(values);
    if (onChange) onChange(values, other.name);
    if (autoClose) setClosed();
  };

  const hasState = Boolean(state && state.length > 0);
  const IconComponent = iconComponent(hasState, open);
  const clear = () => {
    const values: unknown[] = [];
    setState(values);
    if (onChange) onChange(values, other.name);
  };
  const EndAdornment = endAdornment(hasState, clear);

  return (
    <FormControl variant="outlined" className={cls}>
      <Select
        ref={selectRef}
        value={state}
        label={label}
        labelId="label"
        renderValue={(selected) =>
          multiSelectExtRenderValue(
            selected,
            valueField,
            labelField,
            items,
            placeholder,
            renderValue
          )
        }
        IconComponent={IconComponent}
        endAdornment={EndAdornment}
        error={!!error}
        displayEmpty={Boolean(placeholder)}
        placeholder={placeholder}
        open={false}
        onClose={onCloseHandler}
        onOpen={setOpened}
        multiple
        {...other}
      />
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
      <Popover
        open={open}
        anchorEl={selectRef.current}
        onClose={onCloseHandler}
        className={clsMenu}
        anchorOrigin={Object.assign(
          { vertical: 'bottom', horizontal: 'left' },
          MenuProps?.anchorOrigin
        )}
        transformOrigin={Object.assign(
          { vertical: -8, horizontal: 'left' },
          MenuProps?.transformOrigin
        )}
        marginThreshold={10}
        PaperProps={
          autoPopoverWidth
            ? {
                style: {
                  width: selectRef?.current?.clientWidth,
                },
              }
            : undefined
        }
      >
        {displaySearch && (
          <div className="multi-select-ext-field-control__search">
            <TextFieldControl
              value={searchText}
              onChange={onChangeSearch}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder={searchLabel}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
        <div className="multi-select-ext-field-control__content">
          {(!itemsFiltered || itemsFiltered?.length === 0) && (
            <div className="multi-select-ext-field-control__menu-item_no-data">
              not found
            </div>
          )}
          {itemsFiltered?.map((item, index) => {
            const checked = state?.includes(item[valueField]);
            const clsItem = classNames(
              'multi-select-ext-field-control__menu-item',
              {
                'multi-select-ext-field-control__menu-item_checked': Boolean(
                  checked && !displayCheckboxes
                ),
              }
            );
            return (
              <div
                key={index}
                data-value={
                  item[valueField]
                    ? (item[valueField] as unknown as string)
                    : ''
                }
                className={clsItem}
                onClick={() => onChangeHandler(item[valueField] as unknown)}
              >
                {displayCheckboxes && (
                  <CheckboxFieldControl checked={checked} />
                )}
                {renderOption ? (
                  renderOption(item)
                ) : (
                  <div className="multi-select-ext-field-control__menu-item-label">
                    {item[labelField]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {displayButtons && (
          <div className="multi-select-ext-field-control__buttons">
            {onCancel ? (
              <Button
                size="small"
                variant="text"
                color="red"
                onClick={onCancelHandler}
              >
                {cancelLabel}
              </Button>
            ) : (
              <Button
                size="small"
                variant="text"
                color="red"
                onClick={clearAll}
              >
                {clearLabel}
              </Button>
            )}
            {onSave ? (
              <Button
                size="small"
                variant="contained"
                color="blue"
                onClick={onSaveHandler}
              >
                {selectLabel}
              </Button>
            ) : (
              multiple && (
                <Button
                  size="small"
                  variant="contained"
                  color="blue"
                  onClick={selectAll}
                >
                  {selectAllLabel}
                </Button>
              )
            )}
          </div>
        )}
      </Popover>
    </FormControl>
  );
};
