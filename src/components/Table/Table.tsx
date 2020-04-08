import React from 'react';
import './Table.scss';

export interface MyProps {
  dataSource: any[]
};

export default class Table extends React.Component<MyProps, {}> {

  render() {
    return (
      <div className="Table" data-testid="Table">
        Table Component, {this.props.dataSource.length}
      </div>
    );
  }
}
/*
function Table(props: any) {
  return <p>hi, {props.value}</p>;
}*/