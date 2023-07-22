import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';

export const TestCardActions = observer(() => {
  const router = useRouter();
  const handleClose = async () => {
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.path,
    });
  };

  return (
    <Toolbar
      itemsLeft={[
        <IconButton onClick={handleClose} tooltip="Close">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
});
