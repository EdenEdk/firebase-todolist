import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from '@mui/material';
import AddTodoDialogContent from './AddTodoDialogContent';
import {getNewBaseTask, TaskModel} from './Task.model';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (newTask:Partial<TaskModel>)=>void;
};

function AddTodoDialog({ open, onSave, onClose }: Props) {
  const [newTask, setNewTask] = useState<Partial<TaskModel>>(getNewBaseTask());

  const handleTaskChange = (key:string, value:any) =>{
    setNewTask((prevTask)=>{
      return {
        ...prevTask,
        [key]:value
      }
    });
  }

  const handleSave = () => {
    onSave(newTask);
    setNewTask(getNewBaseTask());
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle>Add Todo Item</DialogTitle>
      <AddTodoDialogContent task={newTask}
                            titleChanged={(title:string)=>handleTaskChange('title', title)}
                            douDateChanged={(douDate:number)=>handleTaskChange('douDate', douDate)}
                            priorityChanged={(priority:number)=>handleTaskChange('priority', priority)}/>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(AddTodoDialog);
