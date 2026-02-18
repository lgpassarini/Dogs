import React from 'react';
import PhotoCommentsForm from './PhotoCommentsForm';
import { UserContext } from '../../Contexts/UserContext';
import styles from './PhotoComments.module.css';

const PhotoComments = (props) => {
  const { loggedIn } = React.useContext(UserContext);
  const [comments, setComments] = React.useState(() => props.comments);

  return (
    <div>
      <ul className={styles.comments}>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {loggedIn && (
        <PhotoCommentsForm id={props.id} setComments={setComments} />
      )}
    </div>
  );
};

export default PhotoComments;
