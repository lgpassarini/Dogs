import React from 'react';
import styles from './Image.module.css';

const Image = ({ src, alt }) => {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }) {
    target.style.opacity = 1;
    setSkeleton(true);
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img src={src} alt={alt} className={styles.img} onLoad={handleLoad} />
    </div>
  );
};

export default Image;
