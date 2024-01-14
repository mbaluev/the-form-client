import 'reflect-metadata';
import React from 'react';
import { render } from '@testing-library/react';
import { TextFieldControl, TextFieldControlProps } from '@components/fields';
import { initializeDiContainer } from '@app/diContainer/diContainer';
import { DiContainerProvider } from '@app/diContainer/diContainerProvider';

const testValue = '123456';
const testEmptyValue = 'empty';
const textFieldControlProps: TextFieldControlProps = {
  value: testValue,
  isEdit: false,
};

test('text-field-control view', () => {
  const diContainer = initializeDiContainer();
  const { rerender, getByText } = render(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} />
    </DiContainerProvider>
  );

  const input = getByText(testValue) as HTMLDivElement;
  expect(input.className).toContain('field-control_is-view');
  expect(input.textContent).toEqual(testValue);

  rerender(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} value={undefined} emptyLabel={testEmptyValue} />
    </DiContainerProvider>
  );
  expect(input.textContent).toEqual(testEmptyValue);
});
