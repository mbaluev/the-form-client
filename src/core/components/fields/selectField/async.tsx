import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
  useTheme,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ISelectItem, SelectFieldProps } from '@components/fields/selectField/types';
import CheckIcon from '@mui/icons-material/Check';
import { alpha } from '@mui/material/styles';

const iconComponent = (hasState: boolean, required: boolean, disabled: boolean, open: boolean) => {
  if (hasState && !required && !disabled) return () => null;
  if (open) return ExpandLessIcon;
  return ExpandMoreIcon;
};
const endAdornment = (
  hasState: boolean,
  required: boolean,
  disabled: boolean,
  clear: () => void
) => {
  return hasState && !required && !disabled ? (
    <InputAdornment position="end">
      <IconButton onClick={clear} edge="end" color="primary">
        <CloseIcon />
      </IconButton>
    </InputAdornment>
  ) : undefined;
};

export const SelectSearchAsyncField = (props: SelectFieldProps) => {
  const {
    onChange,
    variant,
    value,
    items,
    error,
    helperText,
    placeholder,
    defaultValue,
    multiple,
    highlightValue,
    required = false,
    disabled = false,
    sx,
    loadItems,
    ...other
  } = props;

  const selectRef = useRef<HTMLDivElement>();
  const theme = useTheme();

  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<string | null>(null);
  const [selectItems, setSelectItems] = useState<ISelectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const hasState = useMemo(() => Boolean(state), [state]);

  useEffect(() => {
    if (selectItems?.find((d) => d.value === value)) setState(value as string);
    else setState(null);
  }, [value, selectItems]);

  const [searchText, setSearchText] = useState<string>('');
  const search = (item: ISelectItem, searchString: string) => {
    return (item.label as string)?.toLowerCase().indexOf(searchString.toLowerCase()) >= 0;
  };
  const itemsFiltered = useMemo(() => {
    const selected =
      selectItems
        ?.filter((item) => state === item.value)
        .filter((item) => search(item, searchText)) || [];
    const notSelected =
      selectItems
        ?.filter((item) => state !== item.value)
        .filter((item) => search(item, searchText)) || [];
    return [...selected, ...notSelected];
  }, [selectItems, searchText, open]);

  const load = async () => {
    setLoading(true);
    try {
      if (loadItems) {
        const dataItems = await loadItems();
        setSelectItems(dataItems || []);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (open) load();
  }, [open]);
  useEffect(() => {
    load();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSearchText('');
  };
  const handleClear = () => {
    setSearchText('');
    setState(null);
    if (onChange) {
      onChange(
        {
          target: { value: null, name: other.name },
        } as SelectChangeEvent<unknown>,
        null
      );
    }
  };
  const handleChange = (onChangeValue: ISelectItem) => {
    const val = onChangeValue.value as string;
    setState(val);
    if (onChange) {
      onChange(
        {
          target: { value: val, name: other.name },
        } as SelectChangeEvent<unknown>,
        null
      );
    }
    handleClose();
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearchClear = () => {
    setSearchText('');
  };
  const renderValue = (selected: any) => {
    const selItem = selectItems?.find((item) => item.value === selected);
    if (!selItem) return <Typography color={theme.palette.fGrey['120']}>{placeholder}</Typography>;
    return (
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {selItem.label}
      </Typography>
    );
  };
  const isChecked = (item: ISelectItem) => item.value === state;

  return (
    <FormControl variant="outlined" sx={sx}>
      <Select
        ref={selectRef}
        value={state || ''}
        renderValue={renderValue}
        open={false}
        onOpen={handleOpen}
        onClose={handleClose}
        IconComponent={iconComponent(hasState, required, disabled, open)}
        endAdornment={endAdornment(hasState, required, disabled, handleClear)}
        placeholder={placeholder}
        error={!!error}
        size="small"
        displayEmpty
        defaultValue=""
        disabled={disabled}
        sx={{
          '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
            paddingRight: hasState && !required ? 0 : undefined,
          },
        }}
        {...other}
      >
        {selectItems?.map((option) => (
          <MenuItem key={option.value} value={option.value as any}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
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
        <Stack sx={{ overflow: 'hidden' }}>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              fullWidth
              value={searchText}
              onChange={handleSearch}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder="Search"
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
          </Box>
          <Divider />
          <Stack sx={{ flexGrow: 1, overflow: 'auto', pt: 2, pb: 2 }}>
            {loading && (
              <MenuItem>
                <Skeleton width="100%" />
              </MenuItem>
            )}
            {!loading && (!itemsFiltered || itemsFiltered?.length === 0) && (
              <MenuItem>
                <Typography color={theme.palette.fGrey['130']} sx={{ width: '100%' }}>
                  Not found
                </Typography>
              </MenuItem>
            )}
            {!loading &&
              itemsFiltered?.map((item: ISelectItem) => {
                const checked = isChecked(item);
                return (
                  <MenuItem
                    key={item.value}
                    onClick={() => handleChange(item)}
                    sx={{
                      backgroundColor:
                        highlightValue && checked
                          ? alpha(theme.palette.primary.main, 0.1)
                          : undefined,
                      '&:hover': {
                        backgroundColor:
                          highlightValue && checked
                            ? alpha(theme.palette.primary.main, 0.15)
                            : undefined,
                      },
                    }}
                  >
                    <ListItemText>
                      <Typography sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {item.label}
                      </Typography>
                    </ListItemText>
                    {highlightValue && checked && (
                      <CheckIcon sx={{ fill: theme.palette.primary.main, ml: 2 }} />
                    )}
                  </MenuItem>
                );
              })}
          </Stack>
        </Stack>
      </Popover>
    </FormControl>
  );
};
