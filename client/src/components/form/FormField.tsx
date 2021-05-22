import { makeStyles } from '@material-ui/core/styles';
import { FormLabel, FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  asterix: {
    color: 'red',
  },
});

type Props = {
  name: string;
  label: string;
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  options?: any;
  register: any;
  type: any;
  errors?: any;
  errorMessage?: string;
  required?: boolean;
  fullWidth?: boolean;
};

const FormField = ({
  label,
  name,
  rootClassName,
  labelClassName,
  inputClassName,
  options,
  type = 'text',
  errorMessage,
  errors,
  register,
  required = false,
  fullWidth = true,
}: Props) => {
  const classes = useStyles();

  return (
    <FormControl margin="normal" fullWidth={fullWidth} classes={{ root: rootClassName }}>
      <FormLabel classes={{ root: labelClassName }}>
        {label} 
        {required && <span className={classes.asterix}> *</span>}
      </FormLabel> 

      <TextField
        className={inputClassName}
        type={type}
        fullWidth={fullWidth}
        {...register(name, { ...options, required })}
      />
      {errors[name] && (
        <span className={classes.asterix}>
          {errorMessage}
        </span>
      )}
    </FormControl>
  );
};

export default FormField;
