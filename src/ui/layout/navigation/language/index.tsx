import IconButton from '@mui/material/IconButton';
import IconLanguage from '@components/svg/icons/components/language';
import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { Container, useTheme } from '@mui/material';
import { Tooltip } from '@theme/tooltip';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { bindToggle, usePopupState } from 'material-ui-popup-state/hooks';
import { Drawer } from '@ui/layout/navigation/drawer';
import { Content } from '@ui/layout/navigation/language/content';

export const Language = observer(() => {
  const { countryName, languageName } = useLocaleStore();
  const theme = useTheme();

  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'menu-language',
  });
  const handleClose = () => popupState.close();

  return (
    <Fragment>
      <Tooltip title={`${countryName} - ${languageName}`}>
        <IconButton
          {...bindToggle(popupState)}
          sx={{
            color: theme.palette.t1Grey['100'],
            '&:hover': { color: theme.palette.common.white },
          }}
        >
          <IconLanguage />
        </IconButton>
      </Tooltip>
      <Drawer popupState={popupState}>
        <Container id="__language" maxWidth="xl">
          <Content onClose={handleClose} />
        </Container>
      </Drawer>
    </Fragment>
  );
});
