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

const nextMealTime = () => {
  const time = new Date();
  const h = time.getHours(), m = time.getMinutes();
  if(h <= 8 || (h == 9 && m <= 30)) return mealTimes[0];
  else if(h <= 13 || (h == 14 && m <= 30)) return mealTimes[1];
  else if(h <= 22 || (h == 23 && m <= 30)) return mealTimes[2];
  else return mealTimes[0];
}

export const ViewUpcomingMealsToolbar = ({onSubmit, ...props}) => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(nextMealTime());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  }

  const handleClick = () => {
    onSubmit(selectedDate, selectedTime);
  }

  useEffect(() => {
    handleClick();
  }, []);

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
          View Upcoming Meals
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container xs={12} spacing={2} sx={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Grid item xs="auto">
                <DesktopDatePicker
                  label="Choose Date to View"
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
                  View Upcoming Meals
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
