import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../API';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const logout = React.useCallback(function logout() {
    setError(null);
    setLoading(false);
    setData(null);
    setLoggedIn(false);
    window.localStorage.removeItem('token');
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLoggedIn(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Usuário Inválido');
      const { token } = await response.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (e) {
      setError(e.message);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const localToken = window.localStorage.getItem('token');

    if (!localToken) return;

    async function autoLogin() {
      const { url, options } = TOKEN_VALIDATE_POST(localToken);

      try {
        setError(null);
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Invalid Token');
        await getUser(localToken);
      } catch (e) {
        logout();
      } finally {
        setLoading(false);
      }
    }

    autoLogin();
  }, [logout]);

  return (
    <UserContext.Provider
      value={{ userLogin, getUser, data, loggedIn, loading, error, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
