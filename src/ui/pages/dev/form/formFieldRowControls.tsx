import React from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl, TextFieldControlView } from '@components/fields';
import { IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const FormFieldRowControls = () => {
  return (
    <Form cols={3}>
      <FormSection title="Edit">
        <FormField isRow title="sku" tooltip="tooltip">
          <TextFieldControl
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormField>
        <FormField isRow title="sku-title" tooltip="sku-title">
          <TextFieldControl />
        </FormField>
        <FormField isRow title="erp-id" tooltip="erp-id">
          <TextFieldControl
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormField>
        <FormField isRow title="erp-title" tooltip="erp-title">
          <TextFieldControl />
        </FormField>
      </FormSection>
      <FormSection title="View">
        <FormField isRow title="is-active" tooltip="is-active">
          <TextFieldControlView value="is-active" />
        </FormField>
        <FormField isRow title="first-time-seen" tooltip="first-time-seen">
          <TextFieldControlView value="first-time-seen" />
        </FormField>
        <FormField isRow title="availability" tooltip="availability">
          <TextFieldControlView value="availability" />
        </FormField>
        <FormField isRow title="region" tooltip="region">
          <TextFieldControlView value="region" />
        </FormField>
      </FormSection>
    </Form>
  );
};
