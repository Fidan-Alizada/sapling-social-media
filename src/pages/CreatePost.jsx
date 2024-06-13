import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { ref, push, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPostRef = push(ref(db, 'posts'));
    const newPostKey = newPostRef.key; 

    const postData = {
      title,
      content,
      likes: 0,
      comments: [],
      reposts: 0,
      saves: 0
    };

    await set(ref(db, `posts/${newPostKey}`), postData);
    navigate('/');
  };

  return (
    <div className="create-post">
      <div className="container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <textarea 
            placeholder="Content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
