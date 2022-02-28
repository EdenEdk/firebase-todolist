import React, {useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {DialogContent, DialogContentText, Grid, Input, Slider, TextField} from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden'
    }
  })
);

interface AddTodoDialogContentProps{
  titleChanged:(name:string)=>void;
  douDateChanged:(name:string)=>void;
  priorityChanged:(priority:number)=>void;
}

function AddTodoDialogContent({titleChanged, douDateChanged, priorityChanged}:AddTodoDialogContentProps) {
  const classes = useStyles();
  const [douDate, setDouDate] = useState('');
  const [priority, setPriority] = useState(1);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    titleChanged(e.target.value);
  };

  const handleDouDateChange = (date: any) => {
    setDouDate(date);
    douDateChanged(date);
  };

  const handleSliderChange = (e: Event, newValue: any) => {
    setPriority(newValue);
    priorityChanged(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setPriority(newValue);
    priorityChanged(newValue);
  };

  const handleBlur = () => {
    if (priority < 1) {
      setPriority(1);
    } else if (priority > 5) {
      setPriority(5);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DialogContent className={classes.root}>
        <DialogContentText>
          Please enter the task details.
        </DialogContentText>
        <Grid container spacing={6} direction="column">
          <Grid item>
            <TextField
              onChange={handleContentChange}
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
              value={douDate}
              onChange={date => handleDouDateChange(date)}
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
                value={priority}
                onChange={handleSliderChange}
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
                value={priority}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
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
