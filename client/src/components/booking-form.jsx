import React, {useState, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AddMovie() {
  const [personName, setPersonName] = React.useState([]);
  const [genresArr, setGenresArr] = useState([]);

  const [seats, setSeats] = React.useState(1);
  const [time, setTime] = React.useState('8am');

  const handleChangeSeats = (event) => {
    setSeats(event.target.value);
  };
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (window.confirm(`Are you sure to pay Rs 300 to Pubpolis?`)) {
      
    }
    const formData = new FormData(event.currentTarget);
    // const genres = formData.get("genres").split(',');

    // fetch('http://pubpolis.com/movies/create', {
    //     method: 'POST',
    //     headers: { 
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${ localStorage.getItem('token') }`
    //     },
    //     body: JSON.stringify({
    //         title: formData.get("title"),
    //         imgUrl: formData.get("imgUrl"),
    //         desc: formData.get("desc"),
    //         genres: personName
    //     })
    // })
    // .then(res => res.json())
    // .then(res => {
    //   if (res.message) return alert(res.message);
    //   alert('New movie added into DB !');
    //   console.log('Success', res);
    //   window.location.replace('/');
    // }).catch(err => {
    //     console.log('Error', err);
    // });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {

    fetch('http://pubpolis.com/getcatalog')
    .then(res => res.json())
    .then(res => {
      let arr = res.map(item => item.title);
      setGenresArr(arr);
    }).catch(err => {

    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12}> */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Seats</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={seats}
                    label="Seats"
                    onChange={handleChangeSeats}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Time</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={time}
                    label="Time"
                    onChange={handleChangeTime}
                  >
                    <MenuItem value="8am">8am</MenuItem>
                    <MenuItem value="11am">11am</MenuItem>
                    <MenuItem value="3pm">3pm</MenuItem>
                    <MenuItem value="6pm">6pm</MenuItem>
                    <MenuItem value="9pm">9pm</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
