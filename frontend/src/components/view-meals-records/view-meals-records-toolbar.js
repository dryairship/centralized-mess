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
const mealTimes = ['All', 'Breakfast', 'Lunch', 'Dinner'];

export const ViewMealsRecordsToolbar = ({onDateChange, selectedDate, onSubmit, onTimeChange, selectedTime, ...props}) => {

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
          View Meals Records
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container xs={12} spacing={2} sx={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Grid item xs="auto">
                <DesktopDatePicker
                  label="Choose Date to View"
                  inputFormat="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={onDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs="auto">
                <TextField
                  fullWidth
                  label="Filter by Time:"
                  name="mealTime"
                  onChange={onTimeChange}
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
                  onClick={onSubmit}
                >
                  View Meals Records
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
