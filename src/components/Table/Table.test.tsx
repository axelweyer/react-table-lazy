import React from 'react';
import { cleanup, render, fireEvent, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './Table';
import users from '../../../public/mock/users.json';
import Column from '../../models/Column';

describe('<Table />', () => {

  // unmount and cleanup DOM after the test is finished
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
   * test if firstname header is displayed
   */
  test('test header of mocked columns', () => {
    const { getByText, getAllByRole } = render(<Table dataSource={users} columns={[new Column('name.first', 'asc')]}/>);
    const header = getAllByRole('columnheader');
    expect(header[0]).toBeInTheDocument();

    const column = getByText('FIRST');
    expect(column).toBeInTheDocument();
  });

  /**
   * test value is displayed
   */
  test('test value of mocked datas is displayed', () => {
    const { getByText } = render(<Table dataSource={users} columns={[new Column('name.first', 'asc')]}/>);
    const firstname = getByText('Eelis');

    expect(firstname).toBeInTheDocument();
  });

  /**
   * test values are displayed in right order
   */
  test('test order of mocked datas', () => {

    const { getAllByRole } = render(<Table dataSource={users} columns={[new Column('name.first', 'asc')]}/>);
    const rows = getAllByRole('row');

    const firstname1 = rows[1].innerHTML.indexOf('Eelis') > -1;
    expect(firstname1).toBeTruthy();
    const firstname2 = rows[2].innerHTML.indexOf('Otto') > -1;
    expect(firstname2).toBeTruthy();
  });

  /**
   * test sorting mocked rows
   */
  test('test order of mocked datas', () => {
    
    const { getAllByRole, getByRole } = render(<Table dataSource={users} columns={[new Column('name.first', 'asc')]}/>);
    const cellsOld = getAllByRole('cell');
    let firstname1 = cellsOld[0].innerHTML.indexOf('Eelis') > -1;
    expect(firstname1).toBeTruthy();
    let firstname2 = cellsOld[1].innerHTML.indexOf('Otto') > -1;
    expect(firstname2).toBeTruthy();

    // apply sorting DESC
    const header = getByRole('columnheader');
    fireEvent.mouseDown(header);

    const cellsNew = getAllByRole('cell');
    firstname1 = cellsNew[0].innerHTML.indexOf('Otto') > -1;
    expect(firstname1).toBeTruthy();
    firstname2 = cellsNew[1].innerHTML.indexOf('Eelis') > -1;
    expect(firstname2).toBeTruthy();
  });
});