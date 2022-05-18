import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: 'dvdev1@test.com',
      password: '123123',
    },
  });

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.log(error.code);
      /*     if (error.code === 'auth/email-already-in-use') {
        console.log('Usuario ya registrado');
      } */
      setError('firebase', {
        message: erroresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Login</h1>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
        >
          <FormError error={errors.email} />
        </FormInput>
        <FormInput
          type="password"
          placeholder="Ingrese Password"
          {...register('password', {
            minLength,
            validate: validateTrim,
          })}
        >
          <FormError error={errors.password} />
        </FormInput>
        {/*  {errors.password && <p>{errors.password.message}</p>} */}
        {/* {errors.email && <p>{errors.email.message}</p>} */}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
