import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
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
      setError('firebase', {
        message: erroresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Registrate</h1>
      {/* validacion del backend de firebase */}
      {/* {errors.firebase && <p>{errors.firebase.message}</p>} */}
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
        {/* {errors.email && <p>{errors.email.message}</p>} */}
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
        <FormInput
          type="password"
          placeholder="Repite Password"
          {...register('repassword', {
            validate: validateEquals(getValues),
          })}
        ></FormInput>
        {/*  {errors.repassword && <p>{errors.repassword.message}</p>} */}
        <FormError error={errors.repassword} />
        <button type="submit">Registrate</button>
      </form>
    </>
  );
};

export default Register;
