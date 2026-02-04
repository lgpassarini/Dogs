import React from 'react';

const PhotoPost = () => {
  const [token, setToken] = React.useState('');
  const [name, setName] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [age, setAge] = React.useState('');
  const [img, setImg] = React.useState('');

  const formData = new FormData();

  formData.append('nome', name);
  formData.append('peso', weight);
  formData.append('idade', age);
  formData.append('img', img);

  function handleSubmit(e) {
    e.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/api/photo', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          name="weight"
          value={weight}
          onChange={({ target }) => setWeight(target.value)}
          placeholder="Weight"
        />
        <input
          type="text"
          name="age"
          value={age}
          onChange={({ target }) => setAge(target.value)}
          placeholder="Age"
        />
        <textarea
          value={token}
          name="token"
          onChange={({ target }) => setToken(target.value)}
          rows={5}
        ></textarea>
        <input type="file" onChange={({ target }) => setImg(target.files[0])} />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default PhotoPost;
