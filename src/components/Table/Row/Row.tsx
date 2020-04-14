import React from 'react';
import './Row.scss';
import get from 'lodash/get';

const Row = (props: any) => {
  return props.keys.map((key: any, index: number) => {
    const value = get(props.data, key);
    return (
      <React.Fragment>
        <td key={value}>
          {value}
        </td>
      </React.Fragment>
    );
  })
}

export default Row;
