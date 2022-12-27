import React from 'react';
import { render } from '@testing-library/react';
import { FormSection } from '@components/form';

describe('FormSection', () => {
  test('renders FormSection component', () => {
    render(<FormSection />);
  });
});
