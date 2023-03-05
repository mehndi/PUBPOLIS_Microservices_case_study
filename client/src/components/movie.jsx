import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import BookingForm from './booking-form';

export default function Movies() {

  const [movie, setMovie] = useState({});
  const {id} = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {

    fetch(`http://pubpolis.com/movies/${id}`)
    .then(res => res.json())
    .then(res => {
      setMovie(res)
    }).catch(err => {

    });
  }, []);

  return (

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 5,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" sx={{textAlign: 'center'}}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {movie.title}
            </Typography>
            <img
                src={`${movie.imgUrl}`}
                style={{width: '100%'}}
              />
            <Stack
              sx={{}}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
              <Typography>
              <br/>
                {movie.desc}
                <br/><br/>
              </Typography>
            </Stack>
            <Typography
              component="h3"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
                Tickets available @ <strong>
                  {movie.amount ? <>Rs {movie.amount}</> : <>Free</>}</strong>
                <br/>
              </Typography>

              {token 
                ? <BookingForm movieid={movie.title} amount={movie.amount} /> 
                : <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>Login to Book now</Button>
              }
              
              
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          
        </Container>
      </main>
      
  );
}