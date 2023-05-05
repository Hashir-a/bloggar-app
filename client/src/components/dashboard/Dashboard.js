import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Dashboard = () => {
  // show all posts
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'http://127.0.0.1:3003/api/posts',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        { mode: 'cors' }
      )
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='md'>
        <h2>Posts</h2>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : (
          Array.isArray(posts) &&
          posts.map((post) => (
            <Box key={post._id} sx={{ bgcolor: '#f5f2f2' }}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </Box>
          ))
        )}
      </Container>
      <Container maxWidth='xs'>
        <Box sx={{ bgcolor: '#f7c9c9' }}>
          <p>hello</p>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
