import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Popover,
  Select,
  Skeleton,
  TextField,
  useTheme,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { MultiSelectFieldProps } from '@components/fields/multiSelectField/types';
import { ChangeEvent, Fragment, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@theme/button';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '@components/loader';

export const iconComponent = (hasState: boolean, open: boolean) => {
  if (hasState) return () => null;
  if (open) return ExpandLessIcon;
  return ExpandMoreIcon;
};
export const endAdornment = (hasState: boolean, clear: () => void) => {
  return hasState ? (
    <InputAdornment position="end" sx={{ height: '100%', maxHeight: 'none' }}>
      <Divider orientation="vertical" />
      <IconButton onClick={clear} edge="end" color="primary">
        <CloseIcon />
      </IconButton>
    </InputAdornment>
  ) : undefined;
};

const renderValue = <ItemType,>(
  selected: unknown,
  valueField: keyof ItemType,
  labelField: keyof ItemType,
  items?: ItemType[],
  placeholder?: string
) => {
  const theme = useTheme();
  const sel = (selected as unknown[])?.filter((s) => s);
  const selLength = sel?.length;
  const selItems = items?.filter((item) => sel?.includes(item[valueField]));
  const selLabel =
    (selItems?.[0]?.[labelField] as string) || (sel[0] as string);
  if (!sel || !selLength) {
    return (
      <Typography
        color={theme.palette.t1Grey['120']}
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {placeholder}
      </Typography>
    );
  }
  if (selLength === 1) {
    return (
      <Typography
        color={theme.palette.primary.main}
        fontWeight={600}
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {selLabel}
      </Typography>
    );
  }
  return (
    <Typography
      color={theme.palette.primary.main}
      fontWeight={600}
      overflow="hidden"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
    >
      {`${selLabel}, +${sel.length - 1}`}
    </Typography>
  );
};

export const MultiSelectField = <ItemType,>(
  props: MultiSelectFieldProps<ItemType>
) => {
  const {
    valueField = 'value' as keyof ItemType,
    labelField = 'label' as keyof ItemType,
    countField = 'count' as keyof ItemType,
    onSave,
    onChange,
    onSelect,
    onCancel,
    onClose,
    onOpen,
    variant,
    value,
    items,
    error,
    helperText,
    placeholder,
    defaultValue,
    multiple,
    loading,
    totalLoading,
    total,
    totalHide,
    autoClose,
    ...other
  } = props;

  const selectRef = useRef<HTMLDivElement>();
  const { t } = useTranslation();
  const theme = useTheme();

  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<ItemType[keyof ItemType][]>(value || []);
  useUpdateEffect(() => {
    setState(value || []);
  }, [value]);

  const [isSearch, setIsSearch] = useState<boolean>(false);
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
  const itemsFiltered = useMemo(() => {
    const selected =
      items
        ?.filter((item) => state?.includes(item[valueField]))
        .filter((item) => search(item, searchText)) || [];
    const notSelected =
      items
        ?.filter((item) => !state?.includes(item[valueField]))
        .filter((item) => search(item, searchText)) || [];
    return [...selected, ...notSelected];
  }, [searchText, loading]);

  const handleApply = () => {
    setOpen(false);
    setSearchText('');
    if (onChange) onChange(state, other.name);
    if (onClose) onClose(state, other.name);
    if (onSave) onSave(state, other.name);
  };
  const handleOpen = () => {
    setOpen(true);
    if (onOpen) onOpen(state, other.name);
  };
  const handleClose = () => {
    setOpen(false);
    setSearchText('');
    setIsSearch(false);
    if (onChange) onChange(state, other.name);
    if (onClose) onClose(state, other.name);
  };
  const handleClearAll = () => {
    setSearchText('');
    setState([]);
    if (onChange) onChange([], other.name);
  };
  const handleClearSelected = () => {
    setSearchText('');
    setState([]);
  };
  const handleSelectAll = () => {
    const values = items?.map((d) => {
      return d[valueField];
    });
    setState(values || []);
  };
  const handleChange = (onChangeValue: ItemType[keyof ItemType]) => {
    let values = state ? [...state] : [];
    if (multiple) {
      if (values.includes(onChangeValue)) {
        values = values.filter((v) => v !== onChangeValue);
      } else {
        values.push(onChangeValue);
      }
    } else {
      if (values[0] === onChangeValue) {
        values = [];
      } else {
        values = [onChangeValue];
      }
    }
    setState(values);
    if (onSelect) onSelect(values, other.name);
    if (autoClose) handleClose();
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearchClear = () => {
    setSearchText('');
  };
  const handleIsSearch = () => {
    if (isSearch) handleSearchClear();
    setIsSearch(!isSearch);
  };

  const hasState = Boolean(state && state.length > 0);
  let countTotal = 0;

  return (
    <FormControl variant="outlined">
      <Select
        ref={selectRef}
        value={state as ItemType[]}
        renderValue={(selected: unknown) =>
          renderValue(selected, valueField, labelField, items, placeholder)
        }
        open={false}
        onOpen={handleOpen}
        onClose={handleClose}
        IconComponent={iconComponent(hasState, open)}
        endAdornment={endAdornment(hasState, handleClearAll)}
        placeholder={placeholder}
        error={!!error}
        size="small"
        displayEmpty
        multiple
        {...other}
      />
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
      <Popover
        open={open}
        anchorEl={selectRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            elevation: 2,
            sx: {
              mt: 1,
              width: selectRef?.current?.clientWidth,
              maxHeight: 400,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <Stack spacing={2} sx={{ pt: 2.5, pb: 2.5, overflow: 'hidden' }}>
          {placeholder && (
            <Typography fontWeight={600} sx={{ pl: 2.5, pr: 2.5 }}>
              {placeholder}
            </Typography>
          )}
          <Stack direction="row" spacing={2} sx={{ pl: 2.5, pr: 2.5 }}>
            {multiple && (
              <Fragment>
                <Button
                  size="small"
                  onClick={handleSelectAll}
                  disabled={items && items.length > 10}
                >
                  {t('common:filter-select-all')}
                </Button>
                <Divider orientation="vertical" sx={{ height: 'auto' }} />
              </Fragment>
            )}
            <Button
              size="small"
              disabled={!hasState}
              onClick={handleClearSelected}
            >
              {t('common:filter-clear')}
            </Button>
            <Divider orientation="vertical" sx={{ height: 'auto' }} />
            <IconButton size="small" onClick={handleIsSearch}>
              <SearchIcon />
            </IconButton>
          </Stack>
          <Box sx={{ pl: 2.5, pr: 2.5 }}>
            {isSearch ? (
              <TextField
                size="small"
                fullWidth
                value={searchText}
                onChange={handleSearch}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder={placeholder}
                InputProps={{
                  endAdornment: searchText ? (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearchClear} edge="end">
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
            ) : (
              <Divider />
            )}
          </Box>
          <Stack sx={{ flexGrow: 1, overflow: 'auto', pl: 2.5, pr: 2.5 }}>
            {loading ? (
              <Stack spacing={2}>
                <Skeleton width="50%" />
                <Skeleton width="75%" />
                <Skeleton width="25%" />
              </Stack>
            ) : (
              <Fragment>
                {(!itemsFiltered || itemsFiltered?.length === 0) && (
                  <Typography
                    color={theme.palette.t1Grey['130']}
                    sx={{ width: '100%' }}
                  >
                    {t('common:filter-not-found')}
                  </Typography>
                )}
                {itemsFiltered?.map((item: ItemType, index: number) => {
                  const checked = state?.includes(item[valueField]);
                  countTotal = checked
                    ? countTotal + Number(item[countField])
                    : countTotal;
                  return (
                    <FormControl key={`${index}-${item[valueField]}`}>
                      <FormControlLabel
                        sx={{
                          mr: 0,
                          display: 'flex',
                          '& .MuiFormControlLabel-label': {
                            flexGrow: 1,
                            overflow: 'hidden',
                          },
                        }}
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={() => handleChange(item[valueField])}
                          />
                        }
                        label={
                          <Stack direction="row" spacing={2}>
                            <Typography
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              flexGrow={1}
                            >
                              {item[labelField] as string}
                            </Typography>
                            <Typography>
                              {item[countField] as string}
                            </Typography>
                          </Stack>
                        }
                      />
                    </FormControl>
                  );
                })}
              </Fragment>
            )}
          </Stack>
          {hasState && !totalHide && (
            <Stack spacing={2} sx={{ pl: 2.5, pr: 2.5 }}>
              <Divider />
              <Button
                variant="text"
                onClick={handleApply}
                fullWidth
                startIcon={
                  totalLoading ? (
                    <Loader relative loading size={20} />
                  ) : undefined
                }
                disabled={totalLoading}
              >
                {`${t('common:filter-show')} ${total || countTotal} ${t(
                  'common:filter-results'
                )}`}
              </Button>
            </Stack>
          )}
        </Stack>
      </Popover>
    </FormControl>
  );
};
