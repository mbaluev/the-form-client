import React, { useState } from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@components/iconButton';
import CloseIcon from '@mui/icons-material/Close';

export const FormColsControls = () => {
  const [visible, setVisible] = useState<boolean[]>([true, true]);
  const setVisibleHandler = (index: number) => {
    const newVisible = [...visible];
    newVisible[index] = !newVisible[index];
    setVisible(newVisible);
  };
  return (
    <Form cols={3}>
      <FormSection title="Section 1" collapsible>
        <FormField
          title={'sku'}
          tooltip={'sku'}
          actions={[
            <IconButton
              onClick={() => setVisibleHandler(0)}
              color={visible[0] ? 'grey' : 'grey-light'}
            >
              {visible[0] ? <Visibility /> : <VisibilityOff />}
            </IconButton>,
          ]}
        >
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
        <FormField
          title={'sku-title'}
          tooltip={'sku-title'}
          actions={[
            <IconButton
              onClick={() => setVisibleHandler(1)}
              color={visible[1] ? 'grey' : 'grey-light'}
            >
              {visible[1] ? <Visibility /> : <VisibilityOff />}
            </IconButton>,
          ]}
        >
          <TextFieldControl />
        </FormField>
        <FormField title={'erp-id'} tooltip={'erp-id'}>
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
        <FormField title={'erp-title'} tooltip={'erp-title'}>
          <TextFieldControl />
        </FormField>
      </FormSection>
      <FormSection title="Section 2">
        <FormField title={'product-id'} tooltip={'product-id'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'meter-id'} tooltip={'meter-id'}>
          <TextFieldControl />
        </FormField>
        <FormField title={'measure'} tooltip={'measure'}>
          <TextFieldControl />
        </FormField>
      </FormSection>
      <FormSection title="Section 3">
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
      </FormSection>
    </Form>
  );
};
