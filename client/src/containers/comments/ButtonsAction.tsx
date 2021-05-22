import { useCallback, useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch, useStore } from 'react-redux';

import { deleteCommentThunk, updateCommentThunk } from '../../actions/comments';
import { Car } from '../../types/car';
import { CommentFormValues } from '../../types/comment';
import CommentForm from './CommentForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textTransform: 'initial',
      fontWeight: 400,
      color: theme.palette.primary.main,
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent',
        opacity: 0.9,
      },
    },
    firstButton: {
      marginRight: theme.spacing(1),
    },
    form: {
      paddingLeft: theme.spacing(8.8),
    },
  }),
);

type Props = { 
  id: string; 
  text?: string;
  car: Car;
};

const ButtonActions = ({ id, text, car }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const store = useStore();

  const toggle = useCallback(() => setOpen(prev => !prev), [setOpen]);

  const handleDelete = useCallback((id: string) => {
    deleteCommentThunk(car, id)(dispatch, store.getState);
  }, [car, store, dispatch]);

  const handleEdit = useCallback((values: CommentFormValues) => {
    updateCommentThunk(car, id, values)(dispatch);
    toggle();
  }, [id, toggle]);

  return (
    <Box mt={-3} mb={1}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          onClick={() => handleDelete(id)} 
          className={clsx(classes.button, classes.firstButton)}
        >
          Supprimer
        </Button>
        <Button
          onClick={toggle}
          className={classes.button}
        >
          Modifier
        </Button>
      </Box>

      {open && (
        <CommentForm 
          onSave={handleEdit} 
          defaultValue={text} 
          className={classes.form} 
        />
      )}
    </Box>
  );
}

export default ButtonActions;