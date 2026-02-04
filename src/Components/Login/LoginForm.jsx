import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../Contexts/UserContext';

const LoginForm = () => {
  const { userLogin, error, loading } = React.useContext(UserContext);
  const username = useForm(null, true);
  const password = useForm('password', true);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username.validate() || !password.validate()) {
      return false;
    }
    userLogin(username.value, password.value);
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" type="text" {...username} />
        <Input label="Senha" name="password" type="password" {...password} />
        {loading ? (
          <Button disabled>Carregando</Button>
        ) : (
          <Button>Entrar</Button>
        )}
      </form>
      {error && <p>{error}</p>}
      <Link to="/login/criar">Cadastrar</Link>
    </section>
  );
};

export default LoginForm;
