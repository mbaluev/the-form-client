import { observer } from 'mobx-react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { TListITem } from '@store/modules/base/list/interface';
import { IListBaseProps } from '@ui/layout/list/list';
import { Button } from '@mui/material';

type IProps<T extends TListITem> = IListBaseProps<T>;

export const BtnReload = observer(<T extends TListITem>(props: IProps<T>) => {
  const { dataModel } = props;
  const { getData } = dataModel;
  const handleRefresh = async () => getData();
  return (
    <Button variant="text" size="small" startIcon={<RefreshIcon />} onClick={handleRefresh}>
      Reload
    </Button>
  );
});
