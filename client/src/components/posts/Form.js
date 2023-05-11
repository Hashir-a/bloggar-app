import React, { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const theme = createTheme();

const Form = () => {
  const [value, setValue] = useState('');

  const [error, setError] = useState({ isError: false, message: [] });
  const [verificationAlert, setVerificationAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 
    const body = {
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      username: data.get('username'),
    };

    if (body['password'] !== body['password2']) {
      setError({
        isError: true,
        message: ['Password confirmation does not match'],
      });
    } else {
      const config = {
        headers: {
          'Content-Type': 'applicatioqn/json',
        },
      };

      await axios
        .post('http://127.0.0.1:3003/api/users', JSON.stringify(body), config)
        .then((response) => {
          if (response.data['user']) {
            setVerificationAlert(true);
            document.getElementById('form').reset();
            setTimeout(() => {
              console.log(response.data); //token
              navigate('/login');
            }, 3000);
          }
        })
        .catch(({ response: { data } }) => {
          if (data['error']) {
            let msg =
              Object.keys(data['error']['keyValue'])[0] + ' already exists';
            setError({
              isError: true,
              message: [msg],
            });
          } else {
            const messages = [];
            data['errors'].map((err) => {
              messages.push(err.msg);
            });
            setError({ isError: true, message: messages });
          }
        });
    }
  };

  const resetError = () => {
    setError({ isError: false, message: '' });
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
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
              <Editor
                apiKey='vbxnlupna2lgbebx1u47teon3es6q6vbzpas99a61cf0b2jc'
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue='<p></p>'
                init={{
                  selector: 'textarea',
                  file_picker_types: 'file image media',
                  height: 500,
                  a11y_advanced_options: true,
                  plugins: [
                    'image',
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help ',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </Grid>

            {Boolean(error.isError) && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity='error'>
                  {error.message.map((msg, index) => (
                    <p key={index}>{msg}</p>
                  ))}
                </Alert>
              </Stack>
            )}
          </Grid>
          <Button
            type='submit'
            md={3}
            xs={3}
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Form;
