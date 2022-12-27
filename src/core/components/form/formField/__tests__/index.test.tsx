import React from 'react';
import { render } from '@testing-library/react';
import { FormField } from '@components/form';

describe('FormField', () => {
  test('renders FormField component', () => {
    render(<FormField />);
  });
});
