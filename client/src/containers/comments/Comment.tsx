import { Box } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Avatar from '../../components/Avatar';
import { Comment as CommentType} from '../../types/comment';

const useStyles = makeStyles(
  createStyles({
    inline: {
      display: 'inline',
    },
  }),
);

type Props = { comment: CommentType };
const Comment = ({ comment }: Props) => {
  const classes = useStyles();

  return (
      <ListItem alignItems="flex-start" key={comment._id}>
          <ListItemAvatar>
            <Avatar content="t" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                  variant="subtitle1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {comment.postedBy.name}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {comment.updatedAt}
                </Typography>
              </Box>
            }
            secondary={comment.text}
          />
        </ListItem>
  );
}

export default Comment;