import React from 'react';
import { Modal } from '@components/modal';
import { IButtonProps } from '@components/button';
import { NoData } from '@components/noData';
import { Loader } from '@components/loader';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface IProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  title?: string;
  message?: string;
}

export const DialogConfirm = (props: IProps) => {
  const {
    isOpen,
    isLoading,
    onClose,
    onCancel,
    onSubmit,
    title = 'Confirm',
    message = 'Are you sure?',
  } = props;

  const footerButtons: IButtonProps[] = [
    {
      children: 'No',
      variant: 'outlined',
      color: 'grey',
      onClick: onCancel,
    },
    {
      children: 'Yes',
      variant: 'contained',
      color: 'blue',
      onClick: onSubmit,
      disabled: isLoading,
    },
  ];

  return (
    <Modal
      className="dialog-upload"
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      {isLoading ? (
        <Loader loading relative />
      ) : (
        <NoData
          icon={<ErrorOutlineIcon />}
          iconClassName="color_red"
          message={message}
          messageClassName="color_black"
        />
      )}
    </Modal>
  );
};
