import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from '@mui/material';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useEffect, useState } from 'react';
const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];
const messes = Array.from({length: 13}, (_, i) => `Hall ${i + 1} Mess`);

const nextMealTime = () => {
  const time = new Date();
  const h = time.getHours(), m = time.getMinutes();
  if(h <= 8 || (h == 9 && m <= 30)) return mealTimes[0];
  else if(h <= 13 || (h == 14 && m <= 30)) return mealTimes[1];
  else if(h <= 20 || (h == 21 && m <= 30)) return mealTimes[2];
  else return mealTimes[0];
}

export const PurchaseExtrasToolbar = ({onSubmit, ...props}) => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(nextMealTime());
  const [selectedMess, setSelectedMess] = useState(2);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  }

  const handleMessChange = (event) => {
    setSelectedMess(event.target.value);
  }

  const handleClick = () => {
    onSubmit(selectedMess, selectedDate, selectedTime);
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Purchase Extras
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container xs={12} spacing={2} sx={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Grid item xs="auto">
                <TextField
                  fullWidth
                  label="Choose Mess:"
                  name="mess"
                  onChange={handleMessChange}
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {messes.map((messName, i) => (
                    <option
                      key={i+1}
                      value={i+1}
                      selected={selectedMess == (i+1)}
                    >
                      {messName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs="auto">
                <DesktopDatePicker
                  label="Choose Date"
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate}
                  minDate={new Date()}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs="auto">
                <TextField
                  fullWidth
                  label="Choose Time:"
                  name="mealTime"
                  onChange={handleTimeChange}
                  select
                  SelectProps={{ native: true }}
                  value={selectedTime}
                  variant="outlined"
                >
                  {mealTimes.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs="auto" alignContent="center">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleClick}
                >
                  View Meal
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
