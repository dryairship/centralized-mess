import Head from 'next/head';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Button, Grid, TextField, Typography, Alert, Link } from '@mui/material';

const backgroundImages = [
  "https://iitk.ac.in/new/images/large-images/visitors/where-to-eat.jpg",
  "https://hall3iitk.com/images/facilities/mess.jpg",
  "http://www.iitk.ac.in/hall8/old_website/images/m1.jpg",
  "http://www.iitk.ac.in/hall8/old_website/images/m2.jpg",
  "https://www.iitk.ac.in/hall4/images/ubuntu.jpg",
];

const Login = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const [userData, setUserData] = useState({id: '', password: ''});
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch('/api/auth/managerLogin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pfNumber: data.get('pfNumber'),
        password: data.get('password'),
      }),
    });
    if (response.status == 200) {
      const content = await response.json();
      localStorage.clear();
      localStorage.setItem('sessionType', content.type);
      localStorage.setItem('pfNumber', content.pfNumber);
      localStorage.setItem('name', content.name);
      localStorage.setItem('phoneNumber', content.phoneNumber);
      localStorage.setItem('messId', content.messId);
      localStorage.setItem('email', content.email);
      window.location.href = '/manager/dashboard';
    } else if (response.status == 500) {
      setAlertData({
        severity: 'error',
        message: 'Unable to connect to the server.',
        visible: true,
      });
    } else {
      const content = await response.json();
      setAlertData({
        severity: 'error',
        message: content.message,
        visible: true,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Manager Login | Centralized Mess</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${backgroundImages[bgImageIndex]})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid container item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center"
              }}
            >
              <Avatar
                src={`https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/IIT_Kanpur_Logo.svg/1200px-IIT_Kanpur_Logo.svg.png`}
                sx={{ width: 202, height: 200 }} />
              <Typography gutterBottom component="h1" variant="h4">
                Centralized Mess @ IITK
              </Typography>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography gutterBottom component="h1" variant="h5">
                Manager Sign In
              </Typography>
              {alertData.visible && 
                <Alert severity={alertData.severity} variant="filled">{alertData.message}</Alert>
              }
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="pfNumber"
                  label="PF Number"
                  name="pfNumber"
                  autoComplete="pfNumber"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/" variant="body2">
                      Login as a Student
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
