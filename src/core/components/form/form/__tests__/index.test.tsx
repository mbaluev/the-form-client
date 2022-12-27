import React from 'react';
import { render } from '@testing-library/react';
import { Form } from '@components/form';

describe('Form', () => {
  test('renders Form component', () => {
    render(<Form />);
  });
});
