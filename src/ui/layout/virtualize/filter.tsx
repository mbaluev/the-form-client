import { observer } from 'mobx-react';
import { FilterText } from '@ui/filter/filterText';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { MEDIA_SM, useWindowSize } from '@hooks/useWindowSize';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import { ReactElement } from 'react';

interface IProps {
  filter?: ReactElement;
  filterSearchName?: string;
  padding?: boolean;
}

export const VirtualizeFilter = observer((props: IProps) => {
  const { filter, filterSearchName, padding } = props;

  const size = useWindowSize();

  return (
    <Stack direction="row" spacing={2} sx={padding ? { pl: 4, pr: 4 } : undefined}>
      {filter && size.width > MEDIA_SM && <Box sx={{ flexGrow: 1 }}>{filter}</Box>}
      {filterSearchName && (
        <Box sx={{ flexGrow: filter && size.width > MEDIA_SM ? 0 : 1 }}>
          <FilterText name={filterSearchName} placeholder="Search" fullWidth />
        </Box>
      )}
      {size.width <= MEDIA_SM && (
        <IconButton color="primary">
          <TuneIcon />
        </IconButton>
      )}
    </Stack>
  );
});
