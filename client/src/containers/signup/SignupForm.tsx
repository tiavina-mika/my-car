import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { signup } from '../../actions/auth';
import SubmitButton from '../../components/buttons/SubmitButton';
import FormField from '../../components/form/FormField';
import { SignupFormValues } from '../../types/auth';

const SignupForm = () => {
	const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>();

  const onSubmit: SubmitHandler<SignupFormValues> = (values: SignupFormValues) => {
    dispatch(signup(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
			<FormField 
				register={register}
				errors={errors} 
				type="email"
				name="email" 
				label="Email"
				required={true}
			/>

			<FormField 
				register={register} 
				errors={errors} 
				type="password"
				name="password" 
				label="Mot de passe"
				required={true}
			/>

			<FormField 
				register={register} 
				errors={errors} 
				type="password"
				name="confirmPassword" 
				label="Confirmer mot de passe"
				required={true}
			/>

			<SubmitButton text="Créer le compte" />
    </form>
  );
}

export default SignupForm;
