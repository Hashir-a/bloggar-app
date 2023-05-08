import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

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
        console.log(response.data);
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={10}>
            <Container maxWidth='md'>
              <h2>Posts</h2>
              {isLoading ? (
                <p>Loading posts...</p>
              ) : (
                Array.isArray(posts) &&
                posts.map((post) => (
                  <React.Fragment key={post._id}>
                    <Card>
                      {post.images.length > 0 ? (
                        <CardMedia
                          sx={{ height: 140 }}
                          image='/static/images/cards/contemplative-reptile.jpg'
                          title='green iguana'
                        />
                      ) : (
                        ''
                      )}
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          {post.title}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {post.content}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button>
                      </CardActions>
                    </Card>
                    <Divider />
                  </React.Fragment>
                ))
              )}
            </Container>
          </Grid>
          <Grid xs={12} md={2}>
            Sidebar
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
