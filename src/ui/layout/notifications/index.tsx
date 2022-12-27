import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { classNames } from '@utils/classNames';
import { IconButton } from '@components/iconButton';
import './index.scss';
import { useViewModel } from '@hooks/useViewModel';
import { INotifyViewModel } from '@viewModel/modules/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';

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
      <div className={clsContent}>...</div>
    </div>
  );
};
