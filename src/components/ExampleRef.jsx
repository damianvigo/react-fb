import { forwardRef, useRef } from 'react';

const InputText = forwardRef((props, ref) => {
  console.log(ref);
  return (
    <>
      <input type="text" id="inputFocus" ref={ref} />
    </>
  );
});

const ExampleRef = () => {
  const inputFocus = useRef(null);
  // console.log(inputFocus);

  const handleButtonClick = () => {
    console.log('me diste click');
    /*  const inputFocus = document.getElementById('inputFocus');
    inputFocus.focus(); */
    // console.log(inputFocus);
    inputFocus.current.focus();
  };

  return (
    <>
      {/* <input type="text" id="inputFocus" ref={inputFocus} /> */}
      <InputText ref={inputFocus} />
      <button onClick={handleButtonClick}>Click ref</button>
    </>
  );
};
export default ExampleRef;
