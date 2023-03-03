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

export default function Album() {

  const [genres, setGenres] = useState([]);

  useEffect(() => {

    fetch('http://pubpolis.com/getcatalog')
    .then(res => res.json())
    .then(res => {
      setGenres(res);
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
              Cinema Catalog
            </Typography>
          </Container>
        </Box>
        <Container  maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>


            {genres.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Link href={'/catalog/'+card.title}>
                  <CardMedia
                    component="img"
                    image={card.imgUrl}
                    alt={card.title}
                  />
                  </Link>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href={'/catalog/'+card.title} size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            
          </Grid>
        </Container>
      </main>
      
  );
}