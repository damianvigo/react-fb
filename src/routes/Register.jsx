import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Register = () => {
  /*   const [email, setEmail] = useState('dvdev@test.com');
  const [password, setPassword] = useState('123123'); */
  const navigate = useNavigate();

  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: 'dvdev1@test.com',
    },
  });

  const onSubmit = async (data) => {
    // repassword solo para la vista
    try {
      await registerUser(data.email, data.password);

      console.log('Usuario creado');
      navigate('/');
    } catch (error) {
      console.log(error.code);
      /*     if (error.code === 'auth/email-already-in-use') {
        console.log('Usuario ya registrado');
      } */
      switch (error.code) {
        //validacion desde el backend
        case 'auth/email-already-in-use':
          setError('email', {
            message: 'Usuario ya registrado',
          });
          break;
        case 'auth/invalid-email':
          setError('email', {
            message: 'Formato email no valido',
          });
        default:
          console.log('Ocurrio un error en el server');
      }
    }
  };

  /* 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('procesando form: ', email, password);
    try {
      await registerUser(email, password);
      console.log('Usuario creado');
      navigate('/');
    } catch (error) {
      console.log(error.code);
    }
  }; */

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          /*      value={email}
          onChange={(e) => setEmail(e.target.value)} */
          {...register('email', {
            required: {
              value: true,
              message: 'Campo obligatorio',
            },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: 'Formato de email incorrecto',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese Password"
          /*  value={password}
          onChange={(e) => setPassword(e.target.value)} */
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Minimo 6 caracteres',
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) {
                  return 'Espacios en blanco por favor escribe algo';
                }
                return true;
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Repite Password"
          /*  value={password}
          onChange={(e) => setPassword(e.target.value)} */
          {...register('repassword', {
            setValueAs: (v) => v.trim(),
            validate: {
              equals: (value) =>
                value === getValues('password') ||
                'No coinciden las contraseñas',
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
