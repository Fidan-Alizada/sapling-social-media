import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { ref, onValue, update } from 'firebase/database';
import '../styles.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const postsRef = ref(db, 'posts');
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsList = Object.keys(postsData).map(key => ({
          id: key,
          ...postsData[key]
        }));
        setPosts(postsList);
      }
    });
  }, []);

  const handleLike = (postId) => {
    const post = posts.find(post => post.id === postId);
    if (post) {
      const isLiked = likedPosts[postId] || false;
      const newLikeValue = isLiked ? post.likes - 1 : post.likes + 1;
      setLikedPosts({
        ...likedPosts,
        [postId]: !isLiked
      });

      const postRef = ref(db, `posts/${postId}`);
      update(postRef, { likes: newLikeValue })
        .catch((error) => {
          setLikedPosts({
            ...likedPosts,
            [postId]: isLiked
          });
          console.error('Error updating post:', error);
        });
    }
  };

  const handleSave = (postId) => {
    const post = posts.find(post => post.id === postId);
    if (post) {
      const isSaved = savedPosts[postId] || false;
      const newSaveValue = !isSaved;
      setSavedPosts({
        ...savedPosts,
        [postId]: newSaveValue
      });

      const postRef = ref(db, `posts/${postId}`);
      update(postRef, { saved: newSaveValue })
        .catch((error) => {
          setSavedPosts({
            ...savedPosts,
            [postId]: isSaved
          });
          console.error('Error updating post:', error);
        });
    }
  };

  const handleComment = (postId) => {
    setCommentingPostId(postId);
  };

  const handleSendComment = (postId) => {
    const postRef = ref(db, `posts/${postId}`);
    const post = posts.find(post => post.id === postId);
    if (post) {
      update(postRef, { comments: post.comments + 1 });
    }
    setCommentingPostId(null);
    setCommentText('');
  };

  const handleCancelComment = () => {
    setCommentingPostId(null);
    setCommentText('');
  };

  const handleRepost = (postId) => {
    const postRef = ref(db, `posts/${postId}`);
    update(postRef, { reposts: posts.find(post => post.id === postId).reposts + 1 });
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1 className='title'>Don't miss new posts 👇❤️</h1>
        <div className="posts">
          {posts.map(post => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="actions">
                <button onClick={() => handleLike(post.id)}>
                  {likedPosts[post.id] ? 'Unlike 👎' : 'Like 👍'} ({post.likes})
                </button>
                <button onClick={() => handleComment(post.id)}>Comment 💬 ({post.comments})</button>
                <button onClick={() => handleRepost(post.id)}>Repost ➡️ ({post.reposts})</button>
                <button onClick={() => handleSave(post.id)}>
                  {savedPosts[post.id] ? 'Unsave ❌' : 'Save 📌'} 
                </button>
              </div>
              {commentingPostId === post.id && (
                <div className="comment-section">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add your comment..."
                  />
                  <button onClick={() => handleSendComment(post.id)}>Send</button>
                  <button onClick={handleCancelComment}>X</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
