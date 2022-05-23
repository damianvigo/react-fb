import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import Button from '../components/Button';
import ButtonLoading from '../components/ButtonLoading';

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title text="Iniciar sesión" />
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Email"
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
          placeholder="Contraseña"
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
        {/*  {loading ? <ButtonLoading /> : <Button text="Acceder" type="submit" />} */}
        <Button type="submit" text="Acceder" loading={loading} />
      </form>
    </>
  );
};

export default Login;
