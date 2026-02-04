import React from 'react';

const PhotoGet = () => {
  const [id, setId] = React.useState('');
  const [src, setSrc] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://dogsapi.origamid.dev/json/api/photo/${id}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setSrc(json.photo.src);
        return json;
      });
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={id}
          onChange={({ target }) => setId(target.value)}
          placeholder="Photo Id"
        />
        <button type="submit">Send</button>
      </form>
      <img src={src} alt="" />
    </>
  );
};

export default PhotoGet;
