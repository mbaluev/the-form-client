import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { VirtualizeAvatar } from '@ui/layout/virtualize/item/avatar';
import { useTenantsStore } from '@store/modules/onboard/tenant/list/useTenantsStore';
import { ITenantItemDTO } from '@model/onboard/tenant';
import { Item } from '@ui/pages/tenants/item';

export const TenantsList = observer(() => {
  const dataModel = useTenantsStore();

  const handleClick = async (id: string) => {
    console.log('tenant:', id);
  };

  return (
    <Stack spacing={2}>
      <Filter dataModel={dataModel} />
      <Toolbar dataModel={dataModel} />
      <List
        dataModel={dataModel}
        itemRenderer={(item: ITenantItemDTO) => <Item item={item} />}
        avatarRenderer={(item: ITenantItemDTO) => (
          <VirtualizeAvatar name={item.displayName} />
        )}
        handleClick={handleClick}
      />
    </Stack>
  );
});
