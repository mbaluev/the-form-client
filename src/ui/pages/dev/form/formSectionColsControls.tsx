import React, { useState } from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Divider, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const FormSectionColsControls = () => {
  return (
    <Form>
      <FormSection cols={2}>
        <FormField title={'sku'} tooltip={'sku'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'sku-title'} tooltip={'sku-title'}>
          <TextFieldControl />
        </FormField>
      </FormSection>
      <Divider />
      <FormSection cols={3}>
        <FormField title={'sku-title'} tooltip={'sku-title'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'erp-id'} tooltip={'erp-id'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'erp-title'} tooltip={'erp-title'}>
          <TextFieldControl />
        </FormField>
      </FormSection>
      <Divider />
      <FormSection cols={4}>
        <FormField title={'product-id'} tooltip={'product-id'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'meter-id'} tooltip={'meter-id'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'measure'} tooltip={'measure'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'unit'} tooltip={'unit'}>
          <TextFieldControl />
        </FormField>
      </FormSection>
      <Divider />
      <FormSection cols={5}>
        <FormField title={'is-active'} tooltip={'is-active'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'availability'} tooltip={'availability'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'region'} tooltip={'region'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'country'} tooltip={'country'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'currency'} tooltip={'currency'}>
          <TextFieldControl />
        </FormField>
      </FormSection>
      <Divider />
      <FormSection cols={6}>
        <FormField title={'is-active'} tooltip={'is-active'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'first-time-seen'} tooltip={'first-time-seen'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'availability'} tooltip={'availability'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'region'} tooltip={'region'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'country'} tooltip={'country'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'currency'} tooltip={'currency'}>
          <TextFieldControl />
        </FormField>
      </FormSection>
    </Form>
  );
};
