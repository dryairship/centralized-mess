import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  Divider,
  CardActions,
  TextField,
  Typography,
  Avatar,
} from '@mui/material';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
const mealTimes = ['All', 'Breakfast', 'Lunch', 'Dinner'];

export const ViewStudentBillsToolbar = ({onSubmit, studentBills, ...props}) => {

  const [studentRoll, setStudentRoll] = useState('');

  const handleChange = (event) => {
    setStudentRoll(event.target.value);
  }

  const handleSubmit = () => {
    onSubmit(studentRoll);
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
          View Student Bills
        </Typography>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row' }}>
        <Card>
          <CardContent>
            <Grid container xs={12} spacing={2} sx={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Grid item xs="auto">
                <TextField
                  fullWidth
                  label="Enter Student's Roll Number"
                  name="studentRoll"
                  onChange={handleChange}
                  required
                  value={studentRoll}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="auto" alignContent="center">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onSubmit}
                >
                  View Bills
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {studentBills ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Card {...props}>
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 3,
                }}
              >
                <Avatar
                  src={`https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${studentBills.roll_number}_0.jpg`}
                  alt={studentBills.name}
                  sx={{
                    height: 150,
                    mb: 2,
                    width: 150
                  }}
                />

                <Box
                  sx={{
                    alignItems: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    mt: -2,
                  }}
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                  >
                    {studentBills.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    gutterBottom
                  >
                    {`${studentBills.phone_number} • ${studentBills.email} • ${studentBills.address}`}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h6"
                  >
                    Meals Bill Amount: ₹ {studentBills.meals.map((meal) => meal.cost).reduce((a, b) => a + b, 0)} <br/>
                    Extras Bill Amount: ₹ {studentBills.extras.map((extra) => extra.cost).reduce((a, b) => a + b, 0)} <br/>
                    Total Bill Amount: ₹ {studentBills.meals.map((meal) => meal.cost).reduce((a, b) => a + b, 0) + 
                                          studentBills.extras.map((extra) => extra.cost).reduce((a, b) => a + b, 0)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : ""
      }
      </Box>
      
    </Box>
  );
}
