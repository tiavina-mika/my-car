import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useForm, SubmitHandler } from 'react-hook-form';

import SubmitButton from '../../components/buttons/SubmitButton';
import FormField from '../../components/form/FormField';
import { EditProfileFormValues } from '../../types/auth';
import { User } from '../../types/user';

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
  }),
);

type Props = { 
  onSave: (values: EditProfileFormValues) => void; 
  className?: string; 
  user: User;
};

const ProfileForm = ({ onSave, className, user }: Props) => {
  const classes = useStyles();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditProfileFormValues>();

  const onSubmit: SubmitHandler<EditProfileFormValues> = (values: EditProfileFormValues) => {
    onSave(values);
    reset(values);
  };
  
  return (
    <Box display="flex" alignItems="center" className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <FormField 
          register={register}
          errors={errors}
          label="Mon nom"
          name="name"
          rootClassName={classes.input}
          defaultValue={user.name}
        />

        <FormField 
          register={register}
          errors={errors} 
          label="Mon email"
          name="email"
          type="email"
          rootClassName={classes.input}
          defaultValue={user.email}
        />

        <SubmitButton text="Enregistrer" />

      </form>
    </Box>
  );
}

export default ProfileForm;
