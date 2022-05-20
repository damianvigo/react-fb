import { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/Button';
import Title from '../components/Title';

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [text, setText] = useState('');
  const [newOriginID, setNewOriginID] = useState('');

  useEffect(() => {
    console.log('getData');
    getData();
  }, []);

  // console.log(data);

  if (loading.getData) return <p>Loading data getData</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newOriginID) {
      await updateData(newOriginID, text);
      setNewOriginID('');
      setText('');
      return;
    }

    await addData(text);
    console.log(text);
    setText('');
  };

  const handleClickDelete = async (nanoid) => {
    console.log('click delete');
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    console.log('click editar');
    setText(item.origin);
    setNewOriginID(item.nanoid);
  };

  console.log(loading);
  // {getData: false, QvATlu: true}

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ex http://google.com.ar"
        />
        {newOriginID ? (
          <Button
            type="submit"
            text="Edita tu url"
            color="indigo"
            loading={loading.updateData}
          />
        ) : (
          <Button type="submit" text="Agregar URL" loading={loading.addData} />
        )}
      </form>

      {data.map((item) => (
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
          <Button
            type="button"
            text="Eliminar"
            color="red"
            loading={loading[item.nanoid]}
            onclick={() => handleClickDelete(item.nanoid)}
          />
          <Button
            type="button"
            text="Editar"
            color="yellow"
            onclick={() => handleClickEdit(item)}
          />
        </div>
      ))}
    </>
  );
};

export default Home;
