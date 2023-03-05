import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Booking() {

  const [booking, setBooking] = useState([]);

  useEffect(() => {

    fetch('http://pubpolis.com/getbooking', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          useremail: localStorage.getItem("useremail")
        })
    })
    .then(res => res.json())
    .then(res => {
      if (res.message) return;
      console.log('Bookings', res);
      setBooking(res);
    }).catch(err => {
        console.log('Error', err);
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
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Bookings
            </Typography>
          </Container>
        </Box>
        <Container  maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>


            {booking.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {card.movie ? <Typography gutterBottom variant="h4" component="h2">
                      {card.movie.title}</Typography> : ''}
                    <Typography gutterBottom variant="h6" component="h5">
                      Date: {card.date}<br/>
                      Time: {card.time}<br/>
                      No. of seats: {card.seats}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            
          </Grid>
        </Container>
      </main>
      
  );
}