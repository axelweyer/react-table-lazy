import React from 'react';
import './Row.scss';
import get from 'lodash/get';

const Row = (props: any) => {
  return props.keys.map((key: any, index: number) => {
    const value = get(props.data, key);
    return (
      <td key={value}>
        {value}
      </td>
    );
  })
}

export default Row;
