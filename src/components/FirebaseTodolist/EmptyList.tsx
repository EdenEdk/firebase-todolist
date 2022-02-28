import React, {ReactElement} from 'react';
import {Button, Typography} from '@mui/material';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface EmptyListProps{
  onAddTodoClicked:()=>void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      '&:hover': {
        backgroundColor: '#6666ff'
      }
    }
  })
);

function EmptyList({onAddTodoClicked}:EmptyListProps):ReactElement{
  const classes = useStyles();

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        No Tasks to show
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={onAddTodoClicked}
      >
        Add Task
      </Button>
    </>
  );


}
export default React.memo(EmptyList);
