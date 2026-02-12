import { number } from 'prop-types';
import React from 'react';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Formato de email inválido',
  },
  password: {
    message: 'A senha deve ter no mínimo 3 caracteres',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize apenas números',
  },
};

const useForm = (type, required = false) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (required && value.length === 0) {
      setError('Campo obrigatório');
      return false;
    }

    switch (type) {
      case 'email':
        if (!types[type].regex.test(value)) {
          setError(types[type].message);
          return false;
        }
        break;
      case 'password':
        if (value.length < 3) {
          setError(types[type].message);
          return false;
        }
        break;
      case 'number':
        if (!types[type].regex.test(value)) {
          setError(types[type].message);
          return false;
        }
    }

    setError(null);
    return true;
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};

export default useForm;
