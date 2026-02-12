import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import styles from './UserPhotoPost.module.css';
import { PHOTO_POST } from '../../API';
import { useNavigate } from 'react-router-dom';

const UserPhotoPost = () => {
  const name = useForm(null, true);
  const weight = useForm('number', true);
  const age = useForm('number', true);
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  const [img, setImg] = React.useState({});

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.validate() || !weight.validate() || !age.validate()) {
      return false;
    }

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', name.value);
    formData.append('peso', weight.value);
    formData.append('idade', age.value);

    const token = localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);

    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...name} />
        <Input label="Peso" type="text" name="peso" {...weight} />
        <Input label="Idade" type="number" name="idade" {...age} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Postando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {error && <Error error={error} />}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
