import React from 'react';
import { FormField, FormSection } from '@components/form';
import { Accordion } from '@components/accordion';
import { Button } from '@components/button';

export const AccordionControls = () => {
  return (
    <FormSection cols={4}>
      <FormField title="1. Simple accordion" align="left">
        <Accordion title="Simple accordion" expanded>
          <FormSection title="Accordion">
            <FormField title="1. Simple accordion" align="left">
              input
            </FormField>
          </FormSection>
        </Accordion>
      </FormField>
      <FormField title="2. Accordion with footer" align="left">
        <Accordion title="Accordion with footer" expanded footer>
          <FormSection title="Accordion">
            <FormField title="1. Accordion with footer" align="left">
              input
            </FormField>
          </FormSection>
        </Accordion>
      </FormField>
      <FormField title="3. Accordion with footer buttons" align="left">
        <Accordion
          title="Accordion with footer buttons"
          expanded
          footerButtons={[
            <Button variant="text" children="Ok" />,
            <Button variant="text" children="Cancel" />,
          ]}
        >
          <FormSection title="Accordion">
            <FormField title="1. Accordion with footer buttons" align="left">
              input
            </FormField>
          </FormSection>
        </Accordion>
      </FormField>
    </FormSection>
  );
};
