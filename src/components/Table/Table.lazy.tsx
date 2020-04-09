import React, { lazy, Suspense } from 'react';
import { MyProps } from './Table';

const LazyTable = lazy(() => import('./Table'));

const Table = (props: MyProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyTable dataSource={props.dataSource} columns={props.columns} />
  </Suspense>
);

export default Table;