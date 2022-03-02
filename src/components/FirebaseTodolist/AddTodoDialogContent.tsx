import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {DialogContent, DialogContentText, Grid, Input, Slider, TextField} from '@mui/material';
import {TaskModel} from './Task.model';
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden'
    }
  })
);

interface AddTodoDialogContentProps{
  task:Partial<TaskModel>;
  titleChanged:(name:string)=>void;
  douDateChanged:(douDate:number)=>void;
  priorityChanged:(priority:number)=>void;
}

function AddTodoDialogContent({task, titleChanged, douDateChanged, priorityChanged}:AddTodoDialogContentProps) {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DialogContent className={classes.root}>
        <DialogContentText>
          Please enter the task details.
        </DialogContentText>
        <Grid container spacing={6} direction="column">
          <Grid item>
            <TextField
              value={task.title}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => titleChanged(e.target.value)}
              margin="dense"
              id="name"
              label="Todo Title"
              fullWidth
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              minDate={new Date()}
              margin="normal"
              id="date-picker-inline"
              label="Dou Date"
              value={task.douDate}
              onChange={(date:MaterialUiPickersDate) => douDateChanged(date!.getTime())}
              invalidDateMessage="Invalid Date"
              minDateMessage="You cannot specify a date earlier than yesterday"
            />
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={2}>
              <DialogContentText>Priority</DialogContentText>
            </Grid>
            <Grid item xs={8}>
              <Slider
                value={task.priority}
                onChange={(e: Event, newValue: number | number[]) => priorityChanged(newValue as number)}
                defaultValue={1}
                aria-valuetext=""
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={1}
                marks
                min={1}
                max={5}
              />
            </Grid>
            <Grid item xs={2}>
              <Input
                value={task.priority}
                margin="dense"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => priorityChanged(Number(e.target.value))}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 5,
                  type: 'number',
                  'aria-labelledby': 'input-slider'
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </MuiPickersUtilsProvider>
  );
}

export default React.memo(AddTodoDialogContent);
