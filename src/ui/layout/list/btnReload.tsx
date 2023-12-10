import { observer } from 'mobx-react';
import { useTranslation } from 'next-i18next';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@theme/button';
import { TListITem } from '@store/modules/base/list/interface';
import { IListBaseProps } from '@ui/layout/list/list';

type IProps<T extends TListITem> = IListBaseProps<T>;

export const BtnReload = observer(<T extends TListITem>(props: IProps<T>) => {
  const { dataModel } = props;
  const { t } = useTranslation();
  const { getData } = dataModel;
  const handleRefresh = async () => getData();
  return (
    <Button
      variant="text"
      size="small"
      color="greyDark"
      startIcon={<RefreshIcon />}
      onClick={handleRefresh}
    >
      {t('common:filter-reload')}
    </Button>
  );
});
