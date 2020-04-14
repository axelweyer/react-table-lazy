import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './Table';
import users from '../../../public/mock/users.json';
import Column from '../../models/Column';

describe('<Table />', () => {
  afterEach(cleanup);

  /**
   * test if config and API response are empty
   */
  test('mount without props', () => {
    const { getByTestId } = render(<Table dataSource={[]} columns={[]}/>);
    const table = getByTestId('content');

    expect(table).toBeInTheDocument();
  });

  /**
   * test if firstname is displayed
   */
  test('test header of mocked columns', () => {
    const { getByText } = render(<Table dataSource={users} columns={[new Column('name.first', 'asc')]}/>);
    const column = getByText('FIRST');

    expect(column).toBeInTheDocument();
  });

  /**
   * test sorting
   */
  /*test('test sorting', () => {
    const { getByTestId } = render(<Table dataSource={users} columns={[new Column('name.first', 'asc')]}/>);
    const tr1 = getByTestId('tr1');

    expect(tr1).toBeInTheDocument();
  });*/
});