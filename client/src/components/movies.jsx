import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Movies() {

  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const {id} = useParams();

  useEffect(() => {

    fetch(`http://pubpolis.com/getcatalog/${id}`)
    .then(res => res.json())
    .then(res => {
      setTitle(res.title)
      setMovies(res.movies);
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
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {title} Catalog
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>


            {movies.length ? movies.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Link href={'/catalog/movies/'+card._id}>
                  <CardMedia
                    component="img"
                    image={card.imgUrl}
                    alt={card.title}
                  /></Link>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.desc}
                    </Typography>
                  </CardContent>
                  <Stack direction="row" spacing={1} sx={{pl: 1, pr: 1, pb: 1}}>
                    {card.genres.map((g, i) => 
                      <Chip label={g} variant="outlined" />
                    )}
                  </Stack>
                  <CardActions>
                    <Button variant="contained" href={'/catalog/movies/'+card._id} size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            )) : "Movies not found in this catalog !"}

            
          </Grid>
        </Container>
      </main>
      
  );
}