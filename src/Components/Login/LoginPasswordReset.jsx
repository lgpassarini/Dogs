import React from 'react';
import { PASSWORD_RESET } from '../../API';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
  const password = useForm(null, true);
  const [searchParams] = useSearchParams();
  const { loading, error, request } = useFetch();

  const key = searchParams.get('key');
  const login = searchParams.get('login');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password.validate()) return;

    const { url, options } = PASSWORD_RESET({
      login,
      key,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response.ok) navigate('/login');
  }

  return (
    <section className="animeLeft">
      <Head title="Resetar senha" />
      <h1 className="title">Resetar senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
