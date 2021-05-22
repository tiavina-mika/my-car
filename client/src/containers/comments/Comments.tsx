import { Fragment } from 'react';

import { Box, Button, ListSubheader } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { getCurrentUser } from '../../reducers/app';
import { Car } from '../../types/car';
import { Comment as CommentType, CommentFormValues } from '../../types/comment';
import ButtonActions from './ButtonsAction';
import Comment from './Comment';
import CommentForm from './CommentForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      paddingBottom: 0,
      paddingTop: theme.spacing(1),
      borderTop: '1px solid ' + grey[300],
    },
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
    }
  }),
);


type Props = { 
  comments?: CommentType[]; 
  onAdd: (values: CommentFormValues) => void;
  car: Car;
};

const Comments = ({ comments, onAdd, car }: Props) => {
  const classes = useStyles();

  const currrentUser = useSelector(getCurrentUser);

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Commentaires (
            {comments?.length || 0}
          )
        </ListSubheader>
      }
    >
      {/* --------------------------------------------------  */}
      {/* ------------ comment form for creation ------------ */}
      {/* --------------------------------------------------  */}
      {currrentUser
        ? <CommentForm onSave={onAdd} />
        : (
          <Box>
            <Button>
              Veuillez-vous connecter pour pouvoir connecter
            </Button>
          </Box>
        )}

      {comments && comments.length > 0 && comments.map((comment: CommentType, index: number) => (
        <Fragment key={comment.id}>
            {/* -----------------------------------------  */}
            {/* ------------ comments details ------------ */}
            {/* -----------------------------------------  */}
            <Comment comment={comment}  />

            {/* --------------------------------------- */}
            {/* ------------ button actions ----------- */}
            {/* --------------------------------------- */}
            <ButtonActions id={comment.id} text={comment.text} car={car} />

            {/* -------------------------------- */}
            {/* ------------ divider ----------- */}
            {/* -------------------------------- */}
            {comments.length - 1 !== index && <Divider variant="inset" component="li" />}

          </Fragment>
      ))}
      
    </List>
  );
}

export default Comments;