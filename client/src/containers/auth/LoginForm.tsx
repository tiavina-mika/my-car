import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { login } from '../../actions/auth';
import SubmitButton from '../../components/buttons/SubmitButton';
import FormField from '../../components/form/FormField';
import { LoginFormValues } from '../../types/auth';

const LoginForm = () => {
	const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (values: LoginFormValues) => {
    dispatch(login(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
			<FormField 
				register={register}
				errors={errors} 
				type="email"
				name="email" 
				label="Email"
				required
			/>

			<FormField 
				register={register} 
				errors={errors} 
				type="password"
				name="password" 
				label="Mot de passe"
				required
			/>

			<SubmitButton text="Connexion" />
    </form>
  );
}

export default LoginForm;
