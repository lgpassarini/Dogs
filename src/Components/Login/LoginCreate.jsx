import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../API';
import { UserContext } from '../../Contexts/UserContext';

const LoginCreate = () => {
  const username = useForm(null, true);
  const email = useForm('email', true);
  const password = useForm('password', true);
  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      password: password.value,
      email: email.value,
    });

    const response = await fetch(url, options);

    console.log(response);

    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginCreate;
