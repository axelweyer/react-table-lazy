import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Row from './Row';

describe('<Row />', () => {
  afterEach(cleanup);

  test('mount with props', () => {
    const rowMock = {name: 'test'}
    let { getByTestId } = render(<Row key={0} data={[rowMock]} keys={['name']} />);
    let row = getByTestId('td');

    expect(row).toBeInTheDocument();
  });
 });
