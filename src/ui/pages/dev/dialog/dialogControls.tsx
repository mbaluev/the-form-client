import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { Button, IButtonProps } from '@components/button';
import { Modal } from '@components/modal';
import { SampleForm } from './sampleForm';

export const DialogControls = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRow, setIsRow] = useState<boolean>(false);
  const footerButtons: IButtonProps[] = [
    {
      color: 'grey',
      variant: 'outlined',
      children: isRow ? 'vertical' : 'horizontal',
      onClick: () => setIsRow(!isRow),
    },
    {
      variant: 'contained',
      children: 'save',
      onClick: () => setIsOpen(false),
    },
  ];
  return (
    <FormSection cols={5}>
      <FormField title="1. Simple dialog" align="left">
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          open dialog
        </Button>
        <Modal
          isOpen={isOpen}
          title="Simple dialog"
          onClose={() => setIsOpen(false)}
          footerButtons={footerButtons}
        >
          <SampleForm isRow={isRow} />
        </Modal>
      </FormField>
    </FormSection>
  );
};
