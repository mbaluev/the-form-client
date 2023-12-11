import { useRef, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  ListItemText,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { SelectChangeEvent } from '@mui/material';
import { SelectFieldProps } from '@components/fields/selectField/types';
import { findItem } from '@components/fields/selectField/findItem';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';

export const SelectField = (props: SelectFieldProps) => {
  const {
    className,
    variant,
    value,
    onChange,
    items,
    error,
    helperText,
    label,
    multiple,
    placeholder,
    displayEmpty,
    required,
    highlightInput,
    highlightValue,
    sx,
    ...other
  } = props;

  const [stateItems, setStateItems] = useState(items);
  const theme = useTheme();

  const isItem = (val?: any) => stateItems?.find((d) => d.value === val);
  const [state, setState] = useState(isItem(value) ? value : '');
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (e: SelectChangeEvent<any>, child?: any) => {
    setState(e.target.value);
    if (onChange) {
      onChange(e, child);
    }
  };
  const handleClear = () => {
    const e = {
      target: { value: '', name: other.name },
    } as SelectChangeEvent<any>;
    handleChange(e);
    handleClose();
  };

  const hasState = Boolean(state) && Boolean(findItem(stateItems, state));
  const IconComponent = hasState && !required ? () => null : ExpandMoreIcon;
  const endAdornment =
    hasState && !required ? (
      <InputAdornment position="end">
        <IconButton edge="end" onClick={handleClear}>
          <CloseIcon />
        </IconButton>
      </InputAdornment>
    ) : undefined;

  const renderValue = (selected: any) => {
    const selItem = items?.find((item) => item.value === selected);
    if (!selItem) {
      return <Typography color={theme.palette.fGrey['120']}>{placeholder}</Typography>;
    }
    const color = highlightInput ? theme.palette.primary.main : undefined;
    const fontWeight = highlightInput ? 600 : undefined;
    return (
      <Typography
        color={color}
        fontWeight={fontWeight}
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

  const selectRef = useRef<HTMLDivElement>();

  useUpdateEffect(() => {
    setState(isItem(value) ? value : '');
  }, [value]);
  useUpdateEffect(() => {
    setStateItems(items);
  }, [items]);

  return (
    <FormControl sx={sx}>
      <Select
        ref={selectRef}
        size="small"
        value={state}
        onChange={handleChange}
        renderValue={renderValue}
        IconComponent={IconComponent}
        endAdornment={endAdornment}
        error={Boolean(error)}
        displayEmpty={Boolean(placeholder)}
        placeholder={placeholder as string}
        MenuProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: { vertical: 'top', horizontal: 'left' },
          PaperProps: {
            elevation: 2,
            sx: {
              mt: 1,
              minWidth: selectRef?.current?.clientWidth,
              maxHeight: 300,
            },
          },
        }}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        {...other}
      >
        {stateItems?.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value ? item.value : ''} disabled={item.disabled}>
              <ListItemText>{item.label}</ListItemText>
              {highlightValue && item.value === state && (
                <CheckIcon sx={{ fill: theme.palette.primary.main, ml: 2 }} />
              )}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
