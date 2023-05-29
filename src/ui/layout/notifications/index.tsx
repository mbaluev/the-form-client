import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { classNames } from '@utils/classNames';
import { IconButton } from '@components/iconButton';
import { useViewModel } from '@hooks/useViewModel';
import { INotifyViewModel } from '@viewModel/modules/common/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { Alert } from '@components/alert';
import './index.scss';

export const Notifications = () => {
  const cls = classNames('notifications');
  const clsHeader = classNames('notifications__header');
  const clsTitle = classNames('notifications__title');
  const clsContent = classNames('notifications__content');
  const { setOpen } = useViewModel<INotifyViewModel>(VIEW_MODEL.Notify);
  return (
    <div className={cls}>
      <div className={clsHeader}>
        <div className={clsTitle}>Notifications</div>
        <IconButton color="grey" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={clsContent}>
        <Alert
          title="info"
          variant="outlined"
          type="info"
          shadow={false}
          border={false}
        />
        <Alert
          title="success"
          variant="outlined"
          type="success"
          shadow={false}
          border={false}
        />
        <Alert
          title="warning"
          variant="outlined"
          type="warning"
          shadow={false}
          border={false}
        />
        <Alert
          title="error"
          variant="outlined"
          type="error"
          shadow={false}
          border={false}
        />
      </div>
    </div>
  );
};
