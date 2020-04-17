import React from 'react';
import './Row.scss';
import get from 'lodash/get';

const Row = (props: any) => {

  return props.keys.map((key: any, index: number) => {
    const value = get(props.data, key);
    const keyTd = props.keyTr + 'td' + index;
    
    return (
      <React.Fragment>
        <td key={keyTd} data-testid='td'>
          {value}
        </td>
      </React.Fragment>
    );
  })
}

export default Row;
