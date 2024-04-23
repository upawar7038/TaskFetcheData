// PostDetails.jsx
import React, { useEffect, useState } from 'react';

const PostDetails = ({ postId, fetchPostDetails }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostDetails(postId)
      .then((data) => setPost(data))
      .catch((error) => console.error(error));
  }, [postId, fetchPostDetails]);

  useEffect(() => {
    console.log('PostDetails component re-rendered due to prop change');
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-details">
      <p>ID: {post.id}</p>
      <p>Title: {post.title}</p>
      <p>Body: {post.body}</p>
    </div>
  );
};

export default PostDetails;
