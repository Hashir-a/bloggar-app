import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import axios from 'axios';
import Divider from '@mui/material/Divider';

const theme = createTheme();

const Form2 = () => {
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill();

  const createPost = () => {
    console.log(quill.getText());
    console.log(quill.getContents());
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Create Post
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <div style={{ height: '50vh' }}>
                <div ref={quillRef} />
              </div>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <Button
            type='submit'
            md={3}
            xs={3}
            variant='contained'
            sx={{ mt: 8, mb: 2 }}
            onClick={createPost}
          >
            Create
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Form2;
