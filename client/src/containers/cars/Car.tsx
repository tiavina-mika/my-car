import { useState } from 'react';

import { Box, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { createComment } from '../../actions/comments';
import { Car as CarType } from '../../types/car';
import { CommentFormValues } from '../../types/comment';
import Comments from '../comments/Comments';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 600,
    borderRadius: 10,
  },
  media: {
    height: 260,
  },
  comment: {
    borderRadius: 6,
  },
  tag: {
    paddingLeft: theme.spacing(5),
    borderColor: grey[500]
  }
}));


type Props = { car: CarType; className?: string };

const Car = ({ car, className }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const toggle = () => setOpen(prev => !prev);
  
  const addComment = (values: CommentFormValues) => {
    dispatch(createComment(car.id, values));
  }

  return (
    <Card className={clsx(classes.root, className)}>
      <CardMedia
        className={classes.media}
        image={car.image}
        title="Contemplative Reptile"
      />
        <CardContent style={{ paddingBottom: 10 }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography gutterBottom variant="h6" component="h6">
                {car.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {car.shortDesc}
              </Typography>
            </Box>
            <Box 
              className={classes.comment}
              display="flex"
              alignItems="flex-start"
            >
            <Button size="small" color="primary" onClick={toggle}>
              Commentaires (
                {
                  car.comments 
                    ? car.comments.length 
                    : 0
                }
              )
            </Button>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            {[car.year, car.distance, car.fuel, car.gearbox].map((info, index) => (
                <Box
                  key={index} 
                  borderLeft={index !== 0 ? 1: 0} 
                  className={index !== 0 ? classes.tag: undefined}
                >
                  <Typography>
                    {info}
                  </Typography>
                </Box>
            ))}
          </Box>
        </CardContent>
        {open && (
          <CardActions>
            <Comments comments={car.comments} onAdd={addComment} />
          </CardActions>
        )}
    </Card>
  );
}

export default Car;