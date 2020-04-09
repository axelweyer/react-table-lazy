import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './Table';

describe('<Table />', () => {
  afterEach(cleanup);

  /*test('it should mount', () => {
    const { getByTestId } = render(<Table dataSource={[]} columns={[]}/>);
    const table = getByTestId('Table');

    expect(table).toBeInTheDocument();
  });*/
});