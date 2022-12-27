import 'reflect-metadata';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TextFieldControl, TextFieldControlProps } from '@components/fields';
import { initializeDiContainer } from '@app/diContainer/diContainer';
import { DiContainerProvider } from '@app/diContainer/diContainerProvider';

const testId = 'test-id';
const testValue = 'test';
const textFieldControlProps: TextFieldControlProps = {
  value: '',
  inputProps: { 'data-testid': testId },
};

test('text-field-control edit', () => {
  const diContainer = initializeDiContainer();
  const textField = render(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} />
    </DiContainerProvider>
  );

  const input = textField.getByTestId(testId) as HTMLInputElement;
  expect(input.value).toBe('');

  // onChange
  textFieldControlProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    expect(e.target.value).toBe(testValue);
    textField.rerender(
      <DiContainerProvider container={diContainer}>
        <TextFieldControl {...textFieldControlProps} value={e.target.value} />
      </DiContainerProvider>
    );
  };
  textField.rerender(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} />
    </DiContainerProvider>
  );
  fireEvent.change(input, { target: { value: testValue } });
  expect(input.value).toBe(testValue);
});
