import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useForm, SubmitHandler } from 'react-hook-form';

import FormField from '../../components/form/FormField';
import { CommentFormValues } from '../../types/comment';
import Avatar from './Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      backgroundColor: grey[200],
      borderRadius: 25,
      '& input:valid:focus': {
        borderRadius: 25,
        backgroundColor: grey[300],
      },
      '& input::placeholder': {
        color: grey[900],
        fontSize: 14,
      },
      '& input:valid + fieldset': {
        borderRadius: 25,
        borderWidth: 0,
        color: 'blue'
      },
      '& input:valid:focus + fieldset': {
        border: 'none',
        padding: '4px !important', // override inline-style
      },
    },
    form: {
      flex: 1
    },
    button: {
      display: 'none',
    },
    avatar: {
      height: 55,
      width: 55,
      marginTop: 5,
      marginRight: theme.spacing(2),
    },
  }),
);

type Props = { 
  onSave: (values: CommentFormValues) => void; 
  defaultValue?: string; 
};

const CommentForm = ({ onSave, defaultValue }: Props) => {
  const classes = useStyles();

	// const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentFormValues>();

  const onSubmit: SubmitHandler<CommentFormValues> = (values: CommentFormValues) => {
    // console.log(values);
    onSave(values);
    reset(values);
  };

  return (
    <Box display="flex" alignItems="center">
      <Avatar text="T" className={classes.avatar} />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <FormField 
          register={register}
          errors={errors} 
          name="name"
          rootClassName={classes.input}
          defaultValue={defaultValue}
          placeholder="Ecrivez un commentaire..."
        />

        <input type="submit" className={classes.button} />
      </form>
    </Box>
  );
}

export default CommentForm;
