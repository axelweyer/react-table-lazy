import React, { MouseEvent } from 'react';
import './Table.scss';
import Column from '../../models/Column';
import Row from './Row/Row';
import sortBy from 'lodash/sortBy';

export interface TableProps {
  dataSource: any[],
  columns: Column[]
};
export interface TableState {
  dataSource: any[];
  header: string[];
  rows: any[];
  activeColumn: Column;
}

export default class Table extends React.Component<TableProps, TableState> {

  render() {
    return (
      <div id="content" data-testid='content'>
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </table>
      </div>
    );
  }

  constructor(props: TableProps) {
    super(props);
    this.state = {
      dataSource: [],
      header: [],
      rows: [],
      activeColumn: this.props.columns[0]
    };
  }

  /**
   * get columns paths
   */
  private getPaths() {

    return this.props.columns.map((column: Column) => {
      return column.path;
    })
  }

  /**
   * get TH for TABLE, depends on columns of the config
   */
  private getHeader() {

    return this.props.columns.map((column: Column) => {
      return (
        <th onMouseDown={() => this.getSortedDatasource(column, true)} key={column.label} className={this.isActiveColumn(column) ? 'active' : ''}>
          {column.label.toUpperCase()}
          {this.displaySortIcon(column)}
          <div className="resizing" onMouseDown={(e) => { this.resizeColumn(e) }}></div>
        </th>
      );
    })
  }

  /**
   * get sorted TR for TABLE from dataSource
   */
  private getRows() {

    var rows: any[] = [];
    var sortedDataSource = this.getSortedDatasource(this.state.activeColumn, false); // sort dataSource
    var columnPaths = this.getPaths();

    // init rows array with TR of the TABLE
    sortedDataSource.forEach(function (row: any, index: any) {
      const keyTr = 'tr' + index;
      rows.push(
        <React.Fragment key={index}>
          <tr>
            <Row key={keyTr} data={row} keys={columnPaths} keyTr={keyTr} />
          </tr>
        </React.Fragment>
      )
    });

    return rows;
  }

  /**
   * return dataSource sorted
   * @param column 
   * @param changeColumnSort 
   */
  private getSortedDatasource(column: Column, changeColumnSort: boolean): any[] {
    
    if (this.props.dataSource.length === 0 || column == null) {
      return [];
    }

    let sortedItems: any[] = sortBy(this.props.dataSource, column.path);

    // reverse array if sorting is DESC
    if (column.sort === 'desc') {
      sortedItems.reverse();
    }

    // if changeColumnSort == true, update the state
    if (changeColumnSort) {
      if (this.isActiveColumn(column)) {
        if (column.sort === 'asc') {
          column.sort = 'desc';
        } else {
          column.sort = 'asc';
        }
      } else {
        column.sort = 'asc';
      }
      this.setState({
        activeColumn: column
      })
    }

    return sortedItems;
  }

  /**
   * display sorted icon if active column
   * @param column 
   */
  private displaySortIcon(column: Column) {

    if (this.isActiveColumn(column)) {
      if (column.sort === 'asc') {
        return (
          <span>▲</span>
        );
      } else {
        return (
          <span>▼</span>
        );
      }
    }

    return;
  }

  /**
   * return true if column passed in parameter is the active column for the sorting
   * @param column 
   */
  private isActiveColumn(column: Column): boolean {

    if (column.path === this.state.activeColumn.path) {
      return true;
    }
    return false;
  }

  /**
   * resize column depends on mouse moving
   * @param e 
   */
  private resizeColumn(e: MouseEvent) {

    e.stopPropagation(); // disable other onMouseDown (sorting)

    // init variables
    var pageX: any, currentColumn: any, currentColumnWidth: any;
    currentColumn = (e.target as HTMLTextAreaElement).parentElement;
    pageX = e.pageX;
    currentColumnWidth = currentColumn.offsetWidth

    // handle mouse move => resize column
    document.addEventListener('mousemove', function (e) {
      // calculate diff
      if (currentColumn) {
        var diffX = e.pageX - pageX;
        currentColumn.style.width = (currentColumnWidth + diffX) + 'px'; // resize current column
      }
    });
    
    // handle mouse up => stop resizing
    document.addEventListener('mouseup', function (e) {
      currentColumn = undefined;
      pageX = undefined;
      currentColumnWidth = undefined;
    });
  }
}