import { observer } from 'mobx-react';
import { FilterText } from '@ui/filter/filterText';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { ReactElement } from 'react';

interface IProps {
  filter?: ReactElement;
  filterSearchName?: string;
  padding?: boolean;
}

export const VirtualizeFilter = observer((props: IProps) => {
  const { filter, filterSearchName, padding } = props;
  return (
    <Stack direction="row" spacing={2} sx={padding ? { pl: 3, pr: 3 } : undefined}>
      {filter && <Box sx={{ flexBasis: '50%' }}>{filter}</Box>}
      {filterSearchName && (
        <Box sx={{ flexBasis: filter ? '50%' : '100%' }}>
          <FilterText name={filterSearchName} placeholder="Search" fullWidth />
        </Box>
      )}
    </Stack>
  );
});
