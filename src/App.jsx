// App.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import PostDetails from './PostDetails';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [postDetails, setPostDetails] = useState(null);

  // Requirement 1: Data Fetching and Rendering
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  // Requirement 2: Heavy Computation Optimization
  const heavyComputation = useCallback((item) => {
    // Simulating heavy computation
    const startTime = new Date().getTime();
    const result = item.title.toUpperCase();
    const endTime = new Date().getTime();
    console.log(`Heavy computation time for item ${item.id}: ${endTime - startTime}ms`);
    return result;
  }, []);

 
  

    // Fetch post details for the selected item
    const fetchPostDetails = useCallback((postId) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => response.json())
        .then((data) => setPostDetails(data))
        .catch((error) => console.error(error));
    }, []);
 // Requirement 3: Callback Memoization
    const handleItemClick = useCallback((item) => {
      setSelectedItem(item);
      fetchPostDetails(item.id); // Fetch details for the clicked item
    }, [fetchPostDetails]);

    return (
      <div className="app">
        <div className="list">
          {data.map((item) => (
            <div key={item.id} onClick={() => handleItemClick(item)} className="item">
              <p>{item.id}</p>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div className="details-container">
          {postDetails && <PostDetails post={postDetails} />}
        </div>
      </div>
    );
};

export default App;
