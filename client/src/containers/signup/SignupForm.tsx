import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { signup } from '../../actions/auth';
import Button from '../../components/Button';
import FormField from '../../components/form/FormField';
import { SignupFormValues } from '../../types/auth';

const SignupForm = () => {
	const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>();

  const onSubmit: SubmitHandler<SignupFormValues> = (values) => {
    dispatch(signup(values));
  }; // your form submit function which will invoke after successful validation

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
				type="confirmPassword"
				name="confirmPassword" 
				label="Confirmer mot de passe"
				required={true}
			/>

			<Button type="submit" text="Créer le compte" />
    </form>
  );
}

export default SignupForm;
