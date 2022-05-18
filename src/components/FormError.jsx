const FormError = ({ error }) => {
  // console.log(props);
  // console.log(error);
  return <>{error && <p>{error.message}</p>}</>;
};

export default FormError;
