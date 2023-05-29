import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  AutocompleteFieldControl,
  AutocompleteFieldControlProps,
  ISelectItem,
  TextFieldControl,
} from '@components/fields';

export type AsyncAutocompleteFieldControlProps<T> = Omit<
  AutocompleteFieldControlProps<T>,
  'renderInput' | 'options'
> & {
  promise?: () => Promise<ISelectItem[] | undefined>;
  loading?: boolean;
};

export const AsyncAutocompleteFieldControl = (
  props: AsyncAutocompleteFieldControlProps<ISelectItem>
) => {
  const { promise, loading, error, value, ...otherProps } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly ISelectItem[]>([]);

  const loadItems = async () => {
    if (promise) {
      try {
        const data = await promise();
        if (data) setOptions([...data]);
      } catch (err) {}
    }
  };

  React.useEffect(() => {
    loadItems();
  }, []);
  React.useEffect(() => {
    if (open) loadItems();
  }, [open]);

  return (
    <AutocompleteFieldControl
      value={value}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => option.label}
      options={options}
      renderInput={(params) => {
        return (
          <TextFieldControl
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress size={17} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            error={error}
          />
        );
      }}
      filterOptions={(filterOptions, state) => {
        const filterVal = state.inputValue.toLocaleLowerCase();
        return filterOptions.filter((option) => {
          return option.label?.toLocaleLowerCase().indexOf(filterVal) >= 0;
        });
      }}
      {...otherProps}
      error={error}
    />
  );
};
