export const formValidate = () => {
  return {
    required: {
      value: true,
      message: 'Campo obligatorio',
    },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: 'Formato de email incorrecto',
    },
    minLength: {
      value: 6,
      message: 'Minimo 6 carácteres',
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return 'Espacios en blanco por favor escribe algo';
        }
        return true;
      },
    },
    validateEquals(getValues) {
      return {
        equals: (value) =>
          value === getValues('password') || 'No coinciden las contraseñas',
      };
    },
  };
};
