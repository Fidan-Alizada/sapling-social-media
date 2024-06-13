import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const postsRef = ref(db, 'posts');
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsList = Object.keys(postsData).map(key => ({
          id: key,
          ...postsData[key]
        }));
        setAnalytics(postsList);
      }
    });
  }, []);

  return (
    <div className="analytics-page">
      <div className="container">
        <h1 className='analis'>Analytics Page</h1>
        <div className="analytics">
          {analytics.map((post, index) => (
            <div key={index} className="post-analytics">
              <h2>{post.title}</h2>
              <p>Likes: {post.likes}</p>
              <p>Comments: {post.comments}</p>
              <p>Reposts: {post.reposts}</p>
              <p>Saves: {post.saves}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
