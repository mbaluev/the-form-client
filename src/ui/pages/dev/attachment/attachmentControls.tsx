import React from 'react';
import { FormField, FormSection } from '@components/form';
import { Attachment } from '@components/attachment';

export const AttachmentControls = () => {
  return (
    <FormSection cols={4}>
      <FormField title="1. Simple attachment" align="left">
        <Attachment />
      </FormField>
    </FormSection>
  );
};
