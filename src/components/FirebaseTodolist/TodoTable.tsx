import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { format } from 'date-fns';
import TodoTableHead from './TodoTableHead';
import {sortTasks, TaskModel} from './Task.model';

interface TodoTableProps {
  tasks: TaskModel[];
  handleDeleteTasks: (taskIds: number[]) => void;
  handleDoneChanged: (taskId:number, newValue:boolean)=>void;
}


function TodoTable({tasks, handleDeleteTasks, handleDoneChanged}:TodoTableProps) {
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [orderBy, setOrderBy] = useState<'douDate' | 'priority' | ''>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if(orderBy && order){
      setSortedTasks(sortTasks(tasks, orderBy, order));
    }
  }, [tasks]);


  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTasks(sortedTasks.map(task=>task.id));
      return;
    }
    setSelectedTasks([]);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, pressedTaskId: number) => {
    const alreadySelected = selectedTasks.includes(pressedTaskId);
    const newSelectedTasks = alreadySelected ? selectedTasks.filter(selectedTaskId => selectedTaskId !== pressedTaskId) : [...selectedTasks, pressedTaskId];
    setSelectedTasks(newSelectedTasks);
  };

  const handleDelete = () => {
    handleDeleteTasks(selectedTasks);
    setSelectedTasks([]);
  };

  const handleDone = (taskId: number, done:boolean) =>{
    handleDoneChanged(taskId, !done);
  }

  const handleSortTasks = (sortBy: 'douDate' | 'priority') =>{
    let newOrder: 'asc' | 'desc' =
      orderBy === sortBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
    setOrderBy(sortBy);
    setOrder(newOrder);
    setSortedTasks(sortTasks(sortedTasks, sortBy,newOrder));
  }

  return (
    <>
      <IconButton
        onClick={handleDelete}
        disabled={selectedTasks.length === 0}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
      <TableContainer>
        <Table>
          <TodoTableHead
            tasks={tasks}
            selected={selectedTasks}
            order={order}
            orderBy={orderBy}
            handleSelectAll={handleSelectAll}
            handleSortTasks={handleSortTasks}
          />
          <TableBody>
            {sortedTasks.map((task: TaskModel) => (
              <TableRow key={task.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    onChange={(e: any) => handleCheck(e, task.id)}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell align="center">
                  {format(task.douDate, 'yyyy/MM/dd')}
                </TableCell>
                <TableCell align="center">{task.priority}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={task.done}
                    onChange={(e: any) => handleDone(task.id, task.done)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default React.memo(TodoTable);
