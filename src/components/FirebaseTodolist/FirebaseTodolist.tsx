import React, {useState} from 'react';
import {AppBar, Toolbar} from '@mui/material';
import {Box, Fab, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AddIcon from '@mui/icons-material/Add';
import EmptyList from './EmptyList';
import AddTodoDialog from './AddTodoDialog';
import {TaskModel} from './Task.model';
import TodoTable from './TodoTable';
import {withFirebase} from './WithFirebase';
import {FirebaseApi} from './firebase.api';
import {useCollectionData} from 'react-firebase-hooks/firestore';

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
  const [open, setOpen] = useState<boolean>(false);
  const [tasks] = useCollectionData<TaskModel>(FirebaseApi.collection as any, {idField:'id'} as any);

  const handleAddTask = async(task:Partial<TaskModel>)=>{
    await FirebaseApi.addTask(task);
    handleClose();
  }

  const handleDeleteTasks = (tasksIds:string[])=>{
    for(const taskId of tasksIds){
      FirebaseApi.deleteTask(taskId);
    }
  }

  const handleDoneChanged = (taskId:string, newValue:boolean)=>{
    FirebaseApi.updateTaskDone(taskId, newValue);
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
        <Box padding="2rem" textAlign={tasks?.length !== 0 ? '' : 'center'}>
          {tasks?.length !== 0 ? (
            <>
              <TodoTable tasks={tasks || []} handleDeleteTasks={handleDeleteTasks} handleDoneChanged={handleDoneChanged}/>
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

export default React.memo(withFirebase(FirebaseTodolist));
