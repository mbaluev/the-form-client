import 'reflect-metadata';
import React, { FC } from 'react';
import { render } from '@testing-library/react';
import { TextFieldControl, TextFieldControlProps } from '@components/fields';
import { initializeDiContainer } from '@app/diContainer/diContainer';
import {
  DiContainerProvider,
  IDIContainerProviderProps,
} from '@app/diContainer/diContainerProvider';
import { renderHook } from '@testing-library/react-hooks';
import { useLocale } from '@hooks/useLocale';

const testValue = '123456789';
const testValue2 = '987654321';
const textFieldControlProps: TextFieldControlProps = {
  value: testValue,
  isEdit: false,
};

test('text-field-control view-format', () => {
  // render useLocale hook
  const diContainer = initializeDiContainer();
  const wrapper: FC<IDIContainerProviderProps> = ({ container, children }) => {
    return <DiContainerProvider container={container}>{children}</DiContainerProvider>;
  };
  const { result } = renderHook(() => useLocale(), {
    wrapper,
    initialProps: {
      container: diContainer,
    },
  });

  // render
  const textField = render(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} />
    </DiContainerProvider>
  );
  const input = textField.getByText(testValue) as HTMLDivElement;

  // number
  textFieldControlProps.inputType = 'number';
  textField.rerender(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} />
    </DiContainerProvider>
  );
  expect(input.textContent).toEqual(result.current.fNumber(testValue));

  // currency
  textFieldControlProps.inputType = 'currency';
  textFieldControlProps.value = testValue2;
  textField.rerender(
    <DiContainerProvider container={diContainer}>
      <TextFieldControl {...textFieldControlProps} />
    </DiContainerProvider>
  );
  expect(input.textContent).toEqual(result.current.fCurrencySymbol(testValue2));
});
