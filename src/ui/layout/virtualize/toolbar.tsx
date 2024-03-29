import { ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import { CheckboxField } from 'core/components/fields/checkboxField';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import Loader from '@components/loader';

interface IProps {
  isLoading?: boolean;
  dataLength?: number;
  dataTotal?: number;
  dataSelected?: (string | undefined | null)[];
  dataSelectAll?: () => void;
  dataAllSelected?: boolean;
  refreshAction?: ReactElement;
  orderByAction?: ReactElement;
  more?: ReactElement;
  padding?: boolean;
  checkbox?: boolean;
}

export const VirtualizeToolbar = observer((props: IProps) => {
  const {
    isLoading,
    dataLength,
    dataTotal,
    dataSelected,
    dataSelectAll,
    dataAllSelected,
    refreshAction,
    orderByAction,
    more,
    padding,
    checkbox,
  } = props;
  const { fNumber } = useLocaleStore();

  // handlers
  const handleSelectAll = () => {
    if (dataSelectAll) dataSelectAll();
  };

  // data
  const selectedAll = dataAllSelected;
  const selectedCount = dataSelected?.length || 0;
  const selectedLength = dataLength || 0;
  const selectedTotal = dataTotal || 0;
  const selectedLabel = `${fNumber(selectedCount)} / ${fNumber(selectedTotal)} selected`;
  const itemsWord = 'items';

  return (
    <Box sx={padding ? { pl: 3, pr: 3 } : undefined}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }} alignItems="center">
          {checkbox ? (
            <CheckboxField
              size="small"
              value={selectedAll}
              label={selectedLabel}
              onChange={handleSelectAll}
              disabled={!dataLength}
              sx={{ '& .MuiFormControlLabel-root': { gap: 1 } }}
            />
          ) : (
            <Box>{`${fNumber(selectedLength)} / ${fNumber(selectedTotal)} ${itemsWord}`}</Box>
          )}
          {isLoading && (
            <Box>
              <Loader relative loading size={20} />
            </Box>
          )}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 0 }} alignItems="center">
          {refreshAction}
          {orderByAction}
          {more}
        </Stack>
      </Stack>
    </Box>
  );
});
