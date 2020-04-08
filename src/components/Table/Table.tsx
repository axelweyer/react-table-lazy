import React from 'react';
import './Table.scss';

export interface MyProps {
  dataSource: any[],
  columns: string[]
};

export default class Table extends React.Component<MyProps, {}> {

  render() {
    const rows = [];

    return (
      <div className="Table" data-testid="Table">
      </div>
    );
  }
}