import { useState } from 'react';
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
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://devsinc.com/'>
        Lolipop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {
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
          'Content-Type': 'application/json',
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

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          {verificationAlert && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity='success'>Verification email has been sent</Alert>
            </Stack>
          )}
          <Box
            component='form'
            id='form'
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstname'
                  required
                  fullWidth
                  id='firstname'
                  label='First Name'
                  autoFocus
                  onChange={resetError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastname'
                  label='Last Name'
                  name='lastname'
                  autoComplete='family-name'
                  onChange={resetError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='username'
                  label='username'
                  name='username'
                  autoComplete='firstname'
                  onChange={resetError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={resetError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={resetError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password2'
                  label='Confirm Password'
                  type='password'
                  id='password2'
                  autoComplete='new-password'
                  onChange={resetError}
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
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
