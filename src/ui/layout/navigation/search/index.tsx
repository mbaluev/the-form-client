import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment, useTheme } from '@mui/material';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { SearchInput } from '@ui/layout/navigation/search/styled';

export const Search = observer(() => {
  const router = useRouter();
  const theme = useTheme();

  const name = 'query';
  const { setFilter, filters } = useFilterStore();
  const [state, setState] = useState<string | undefined>(filters[name]);
  const setFiltersValue = (value?: string) => setFilter(name, value);

  const requestRedirect = async (value?: string) => {
    await router.push({ pathname: ROUTES.HOME.path, query: { [name]: value } });
  };
  const request = (value?: string) => {
    setFiltersValue(value);
  };
  const debounceRequestRedirect = useCallback(debounce(requestRedirect, 1000), []);
  const debounceRequest = useCallback(debounce(request, 1000), []);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(e.target.value);
    if (router.pathname === ROUTES.HOME.path) debounceRequest(e.target.value);
    else debounceRequestRedirect(e.target.value);
  };
  const clearFilters = () => {
    setState(undefined);
    request(undefined);
  };

  useEffect(() => setState(filters[name]), [filters[name]]);

  return (
    <SearchInput
      value={state || ''}
      onChange={onChange}
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.t1Grey[130] }} />
          </InputAdornment>
        ),
        endAdornment: state ? (
          <InputAdornment position="end">
            <IconButton onClick={clearFilters} edge="end">
              <CloseIcon sx={{ color: theme.palette.t1Grey[130] }} />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      fullWidth
    />
  );
});
