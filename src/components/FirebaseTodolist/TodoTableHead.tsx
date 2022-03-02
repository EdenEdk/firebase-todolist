import React  from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {TaskModel} from './Task.model';

type TodoTableHeadProps = {
  tasks:TaskModel[];
  selected: string[];
  order: 'asc' | 'desc';
  orderBy: ''| 'douDate' | 'priority';
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortTasks: (sortBy: 'douDate' | 'priority') => void;
};

function TodoTableHead({order, orderBy, tasks, handleSortTasks, selected, handleSelectAll }: TodoTableHeadProps) {
  const handleSort = (sortBy: 'douDate' | 'priority') => (e: React.MouseEvent) => {
    handleSortTasks(sortBy);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={tasks.length > 0 && tasks.length === selected.length}
            onChange={handleSelectAll}
          />
        </TableCell>
        <TableCell>Title</TableCell>
        <TableCell align="center">
          <TableSortLabel
            active={orderBy === 'douDate'}
            direction={order === 'asc' ? 'desc' : 'asc'}
            onClick={handleSort('douDate')}
          >
            Dou Date
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">
          <TableSortLabel
            active={orderBy === 'priority'}
            direction={order === 'asc' ? 'desc' : 'asc'}
            onClick={handleSort('priority')}
          >
            Priority
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">
            Done
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default React.memo(TodoTableHead);
