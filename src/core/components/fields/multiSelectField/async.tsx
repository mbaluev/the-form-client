import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Popover,
  Skeleton,
  TextField,
  useTheme,
  Select,
  Button,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { MultiSelectAsyncFieldProps } from '@components/fields/multiSelectField/types';
import { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '@components/loader';
import { endAdornment, iconComponent } from '@components/fields/multiSelectField/index';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { VirtualizeBlock } from '@ui/layout/virtualize/block';
import NoData from '@components/noData';
import { ISelectItem } from '@components/fields/selectField/types';
import { Tooltip } from '@theme/tooltip';

const renderValue = (selected: unknown, dictionary?: ISelectItem[], placeholder?: string) => {
  const theme = useTheme();
  const sel = (selected as unknown[])?.filter((s) => s);
  const selValue = sel[0] as string;
  const selItem = dictionary?.find((d) => d.value === selValue);
  const selLabel = selItem?.label || selValue;
  if (!sel || !sel.length) {
    return <Typography color={theme.palette.fGrey['120']}>{placeholder}</Typography>;
  }
  if (sel.length === 1) {
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

export const MultiSelectAsyncField = <ItemType,>(props: MultiSelectAsyncFieldProps<ItemType>) => {
  const {
    valueField = 'value' as keyof ItemType,
    labelField = 'label' as keyof ItemType,
    countField = 'count' as keyof ItemType,
    dictionary,
    onSave,
    onChange,
    onSelect,
    onCancel,
    onClose,
    onOpen,
    variant,
    value,
    error,
    helperText,
    placeholder,
    defaultValue,
    multiple,
    loadItems,
    loadTotal,
    showPopoverTitle,
    ...other
  } = props;

  const selectRef = useRef<HTMLDivElement>();
  const theme = useTheme();
  const { fNumber } = useLocaleStore();

  const [state, setState] = useState<ItemType[keyof ItemType][]>(value || []);
  const hasState = Boolean(state && state.length > 0);
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
        (item[key] as unknown as string).toLowerCase().indexOf(searchString.toLowerCase()) >= 0
      ) {
        ret = true;
      }
    }
    return ret;
  };

  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<readonly ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalLoading, setTotalLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number | undefined>();

  const load = async () => {
    setLoading(true);
    try {
      const data = await loadItems(other.name);
      const dataItems = data?.map((d: any) => {
        const label = dictionary?.find((d1) => d1.value === d.value)?.label;
        return { ...d, label: label || d.label };
      });
      setItems(dataItems || []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const loadCount = async () => {
    setTotalLoading(true);
    try {
      const data = await loadTotal(other.name, state);
      setTotal(data);
    } catch (err) {
      setTotal(undefined);
    } finally {
      setTotalLoading(false);
    }
  };
  useEffect(() => {
    if (open) {
      load();
    } else {
      // setItems([]);
    }
  }, [open]);
  useEffect(() => {
    if (open && hasState) {
      loadCount();
    } else {
      setTotal(0);
    }
  }, [open, state, hasState]);

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
  }, [items, searchText]);

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

  return (
    <FormControl variant="outlined">
      <Select
        ref={selectRef}
        value={state as ItemType[]}
        renderValue={(selected: unknown) => renderValue(selected, dictionary, placeholder)}
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
        sx={{
          ...other.sx,
          '& .MuiOutlinedInput-input.MuiOutlinedInput-input.MuiOutlinedInput-input': {
            paddingRight: hasState ? 0 : undefined,
          },
        }}
      />
      {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
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
          {showPopoverTitle && placeholder && (
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
                  disabled={
                    loading || (items && items.length > 10) || state.length === items.length
                  }
                >
                  Select all
                </Button>
                <Divider orientation="vertical" sx={{ height: 'auto' }} />
              </Fragment>
            )}
            <Button size="small" disabled={loading || !hasState} onClick={handleClearSelected}>
              Clear
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
          <Stack sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <Fragment>
              {loading && (
                <Box sx={{ pl: 2.5, pr: 2.5 }}>
                  <Skeleton />
                </Box>
              )}
              {!loading &&
                (!itemsFiltered || itemsFiltered?.length === 0 ? (
                  <Box sx={{ pl: 2.5, pr: 2.5 }}>
                    <Typography color={theme.palette.fGrey['130']}>Not found</Typography>
                  </Box>
                ) : (
                  <VirtualizeBlock
                    data={itemsFiltered}
                    dataLength={itemsFiltered.length}
                    estimateSize={39}
                    rowNoData={<NoData />}
                    rowRenderer={(item: ItemType) => {
                      const checked = state?.includes(item[valueField]);
                      const count = Number(item[countField]) || 0;
                      return (
                        <FormControl sx={{ pl: 2.5, pr: 2.5, width: '100%' }}>
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
                                <Tooltip
                                  title={
                                    (item[labelField] as string).length > 10
                                      ? (item[labelField] as string)
                                      : false
                                  }
                                >
                                  <Typography
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    flexGrow={1}
                                  >
                                    {item[labelField] as string}
                                  </Typography>
                                </Tooltip>
                                <Typography>{fNumber(count)}</Typography>
                              </Stack>
                            }
                          />
                        </FormControl>
                      );
                    }}
                  />
                ))}
            </Fragment>
          </Stack>
          {hasState && (
            <Stack spacing={2} sx={{ pl: 2.5, pr: 2.5 }}>
              <Divider />
              <Button
                variant="text"
                onClick={handleApply}
                fullWidth
                startIcon={totalLoading ? <Loader relative loading size={20} /> : undefined}
                disabled={!hasState || totalLoading}
              >
                {total ? `Show ${fNumber(total)} results` : 'Show results'}
              </Button>
            </Stack>
          )}
        </Stack>
      </Popover>
    </FormControl>
  );
};
