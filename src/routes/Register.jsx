import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import { UserContext } from '../context/UserProvider';
import { erroresFirebase } from '../utils/erroresFirebase';

import { formValidate } from '../utils/formValidate';

const Register = () => {
  const navigate = useNavigate();

  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: 'dvdev1@test.com',
      password: '123123',
      repassword: '123123',
    },
  });

  const onSubmit = async (data) => {
    // repassword solo para la vista
    try {
      await registerUser(data.email, data.password);

      // console.log('Usuario creado');
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
      <Title text="Regístrate " />
      {/* validacion del backend de firebase */}
      {/* {errors.firebase && <p>{errors.firebase.message}</p>} */}
      {/*   <FormError error={errors.firebase} /> */}
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
        {/* {errors.email && <p>{errors.email.message}</p>} */}
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
        <FormInput
          type="password"
          placeholder="Repite Password"
          {...register('repassword', {
            validate: validateEquals(getValues('password')),
          })}
          label="Repite tu contraseña"
          error={errors.repassword}
        >
          {/*  {errors.repassword && <p>{errors.repassword.message}</p>} */}
          <FormError error={errors.repassword} />
        </FormInput>

        <Button text="Registrate" type="submit" />
      </form>
    </>
  );
};

export default Register;
