import React from 'react';
import './Table.scss';
import Column from '../../models/Column';
import Row from './../Row/Row';

export interface MyProps {
  dataSource: any[],
  columns: Column[]
};
export interface MyState {
  dataSource: any[];
  header: string[];
  rows: any[];
}

export default class Table extends React.Component<MyProps, MyState> {

  render() {
    return (
      <div id="content">
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>
            {this.getRowsData()}
          </tbody>
        </table>
      </div>
    );
  }

  constructor(props: MyProps) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getPaths = this.getPaths.bind(this);
  }

  private getPaths() {
    return this.props.columns.map((column: Column) => {
      return column.path;
    })
  }

  private getKeys(): string[] {
    return this.props.columns.map((column: Column) => {
      return column.label;
    })
  }

  private getHeader() {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>
    })
  }

  private getRowsData() {
    var items = this.props.dataSource;
    var keys = this.getPaths();
    return items.map((row, index) => {
      return (
        <tr key={index}>
          <Row key={index} data={row} keys={keys} />
        </tr>
      );
    })
  }
}