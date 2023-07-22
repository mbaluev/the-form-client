import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Modal } from '@components/modal';
import { NoData } from '@components/noData';

export interface IDialogUnsavedProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onDiscard?: () => void;
  onSave?: () => void;
  disabled?: boolean;
}

export const DialogUnsaved = (props: IDialogUnsavedProps) => {
  const { isOpen, onClose, onCancel, onDiscard, onSave, disabled } = props;
  return (
    <Modal
      className="dialog-unsaved"
      title="Save changes"
      isOpen={isOpen}
      onClose={() => {
        if (onCancel) onCancel();
        if (onClose) onClose();
      }}
      footerButtons={[
        {
          children: 'Cancel',
          variant: 'outlined',
          color: 'grey',
          onClick: () => {
            if (onCancel) onCancel();
            if (onClose) onClose();
          },
        },
        {
          children: 'Discard',
          variant: 'outlined',
          color: 'grey',
          onClick: () => {
            if (onDiscard) onDiscard();
            if (onClose) onClose();
          },
        },
        {
          children: 'Save',
          variant: 'contained',
          color: 'blue',
          disabled: disabled,
          onClick: () => {
            if (onSave) onSave();
            if (onClose) onClose();
          },
        },
      ]}
    >
      <NoData
        icon={<InfoOutlinedIcon />}
        iconClassName="color_blue"
        message={
          <React.Fragment>
            You have modified this page.
            <br />
            Do you want to save the changes before you go?
          </React.Fragment>
        }
        messageClassName="color_black"
      />
    </Modal>
  );
};
