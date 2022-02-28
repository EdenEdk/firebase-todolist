import React, {useState} from 'react';
import {AppBar, Toolbar} from '@mui/material';
import { Box, Typography, Fab } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import AddIcon from '@mui/icons-material/Add';
import EmptyList from './EmptyList';
import AddTodoDialog from './AddTodoDialog';
import {TaskModel} from './Task.model';
import TodoTable from './TodoTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: '2rem',
      right: '2rem',
      '&:hover': {
        backgroundColor: '#6666ff'
      }
    }
  })
);
function FirebaseTodolist(){
    const classes = useStyles();
    const tasks:TaskModel[] = [];
    const [open, setOpen] = useState<boolean>(false);

    const handleAddTask = (task:Partial<TaskModel>)=>{
      console.log('FIREBASE SAVE', task);
      handleClose();
    }

  const handleDeleteTasks = (tasksIds:number[])=>{
    console.log('FIREBASE Delete', tasksIds);
  }

  const handleDoneChanged = (taskId:number, newValue:boolean)=>{
    console.log('FIREBASE Done', taskId, newValue);
  }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">My TO DO List</Typography>
          </Toolbar>
        </AppBar>
        <Box padding="2rem" textAlign={tasks.length !== 0 ? '' : 'center'}>
          {tasks.length !== 0 ? (
            <>
              <TodoTable tasks={tasks} handleDeleteTasks={handleDeleteTasks} handleDoneChanged={handleDoneChanged}/>
              <Fab
                className={classes.fab}
                onClick={handleOpen}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </>
          ) : (
            <EmptyList onAddTodoClicked={handleOpen}/>
          )}
          <AddTodoDialog open={open} onSave={handleAddTask} onClose={handleClose} />
        </Box>
      </>

    );


}
export default React.memo(FirebaseTodolist);
