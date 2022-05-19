import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import Button from '../components/Button';

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
      //erroresFirebase ahora retorna un objeto con el codigo y el mensaje
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        // message: erroresFirebase(error.code),
        message: message,
      });
    }
  };

  return (
    <>
      <Title text="Iniciar sesión" />
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
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
          label="Ingresa tu contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>
        {/*  {errors.password && <p>{errors.password.message}</p>} */}
        {/* {errors.email && <p>{errors.email.message}</p>} */}
        <Button text="Acceder" />
      </form>
    </>
  );
};

export default Login;
