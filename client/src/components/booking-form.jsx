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

export default function BookingForm(props) {
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

  const createBooking = (formData, paymentData) => {

    const d = new Date();

    fetch('http://pubpolis.com/booking/create', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ localStorage.getItem('token') }`
        },
        body: JSON.stringify({
            useremail: localStorage.getItem("useremail"),
            movieid: props.movieid,
            seats: formData.get("seats"),
            paymentid: paymentData._id,
            date: d.toDateString(),
            time: formData.get("time")
        })
    })
    .then(res => res.json())
    .then(res => {
      if (res.message) return alert(res.message);
      console.log('Success', res);
      alert('Booking Done !')
      window.location.replace('/booking');
    }).catch(err => {
        console.log('Error', err);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    fetch('http://pubpolis.com/payment/create', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ localStorage.getItem('token') }`
        },
        body: JSON.stringify({
            amount: formData.get("seats") * props.amount
        })
    })
    .then(res => res.json())
    .then(res => {
      if (res.message) return alert(res.message);
      console.log('Success', res);
      
      createBooking(formData, res);

    }).catch(err => {
        console.log('Error', err);
    });
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
                  <InputLabel id="seats-label">Seats</InputLabel>
                  <Select
                    labelId="seats-label"
                    id="seats"
                    name="seats"
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
                  <InputLabel id="time-label">Time</InputLabel>
                  <Select
                    labelId="time-label"
                    id="time"
                    name="time"
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
