import { FC } from 'react';
import { MENU_CONFIG_SCHOOL } from '@app/settings/menu/school';
import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';
import { VIEW_MODEL } from '@viewModel/ids';

export const MasterSchool: FC<any> = observer((props) => {
  const { children } = props;
  const { isDataLoading } = useViewModel<IAuthViewModel>(VIEW_MODEL.Auth);
  const menuProps = { items: MENU_CONFIG_SCHOOL };
  const loaderProps = { loading: isDataLoading };
  return (
    <Layout menuProps={menuProps} loaderProps={loaderProps}>
      {children}
    </Layout>
  );
});
