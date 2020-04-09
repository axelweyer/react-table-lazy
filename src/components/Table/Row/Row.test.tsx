import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Row from './Row';

describe('<Row />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Row />);
    const row = getByTestId('Row');

    expect(row).toBeInTheDocument();
  });
});