import React from 'react';
import { render } from '@testing-library/react';
import {
  fieldControlClassNames,
  SkeletonFieldControl,
  TextFieldControl,
  TextFieldControlProps,
} from '@components/fields';

const props: TextFieldControlProps = {
  loading: true,
};

test('text-field-control loading', () => {
  const input = render(<TextFieldControl {...props} />);
  const cls = fieldControlClassNames(props, 'text-field-control');
  const skeleton = render(<SkeletonFieldControl className={cls} />);
  expect(input.container.innerHTML).toEqual(skeleton.container.innerHTML);
});
