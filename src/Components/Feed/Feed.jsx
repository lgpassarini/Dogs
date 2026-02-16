import React from 'react';
import FeedPhotos from './FeedPhotos';
import FeedModal from './FeedModal';
const Feed = () => {
  const [modalPhoto, setModalPhoto] = React.useState(null);

  return (
    <section>
      {modalPhoto && <FeedModal photo={modalPhoto} />}
      <FeedPhotos setModalPhoto={setModalPhoto} />
    </section>
  );
};

export default Feed;
