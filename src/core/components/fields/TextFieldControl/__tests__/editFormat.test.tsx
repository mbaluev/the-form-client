import 'reflect-metadata';
import React, { FC } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TextFieldControl, TextFieldControlProps } from '@components/fields';
import {
  DiContainerProvider,
  IDIContainerProviderProps,
} from '@app/diContainer/diContainerProvider';
import { renderHook } from '@testing-library/react-hooks';
import { useLocale } from '@hooks/useLocale';
import { initializeDiContainer } from '@app/diContainer/diContainer';

const testId = 'test-id';
const testValue = '123456789';
const testValue2 = '987654321';
const textFieldControlProps: TextFieldControlProps = {
  value: '',
  inputProps: { 'data-testid': testId },
};

test('text-field-control edit-format', () => {
  // render useLocale hook
  const diContainer = initializeDiContainer();
  const wrapper: FC<IDIContainerProviderProps> = ({ container, children }) => {
    return (
      <DiContainerProvider container={container}>
        {children}
      </DiContainerProvider>
    );
  };
  const { result } = renderHook(() => useLocale(), {
    wrapper,
    initialProps: {
      container: diContainer,
    },
  });

  // inputText
  const textField = render(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} />
    </DiContainerProvider>
  );
  const input = textField.getByTestId(testId) as HTMLInputElement;
  expect(input.value).toBe('');

  // inputNumber
  textFieldControlProps.inputType = 'number';
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
  const inputNumber = textField.getByTestId(testId) as HTMLInputElement;
  fireEvent.change(inputNumber, { target: { value: testValue } });
  expect(inputNumber.value).toEqual(result.current.fNumber(testValue));

  // inputCurrency
  textFieldControlProps.onChange = undefined; // clear onChange event
  textField.rerender(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} />
    </DiContainerProvider>
  );
  textFieldControlProps.inputType = 'currency';
  textFieldControlProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    expect(e.target.value).toBe(testValue2);
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
  const inputCurrency = textField.getByTestId(testId) as HTMLInputElement;
  fireEvent.change(inputCurrency, { target: { value: testValue2 } });
  expect(inputCurrency.value).toEqual(result.current.fNumber(testValue2));
});
