// Cell data is shown in lists
import React from 'react';
import { Props } from 'payload/components/views/Cell';
import './styles.scss';

const Cell: React.FC<Props> = (props) => {
  const { cellData } = props;

  if (!cellData) return null;

  return (
    <div />
  )
}

export default Cell;