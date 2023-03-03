import * as React from 'react';
import { Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function HomeContent() {

  let currentUser = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.replace('/login');
  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Header */}
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link
              href="/"
            >PUBPOLIS</Link>
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              Catalog
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/add-genres"
              sx={{ my: 1, mx: 1.5 }}
            >
              + Add Genres
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/add-movie"
              sx={{ my: 1, mx: 1.5 }}
            >
              + Add Movie
            </Link>
          </nav>
          {currentUser 
            ? <><Avatar
            sx={{ bgcolor: 'orange' }}
            alt={currentUser}
            src=""
          />{currentUser} <Button onClick={handleLogout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>Logout</Button></>
            : <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>Login</Button>
          }
          
        </Toolbar>
      </AppBar>
      {/* End Header */}


      <Outlet />


      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Home() {
  return <HomeContent />;
}