import Head from 'next/head';
import { useState } from 'react';
import { Box, Container, Alert } from '@mui/material';
import { ViewMealsRecordsResults } from '../../components/view-meals-records/view-meals-records-results';
import { ViewMealsRecordsToolbar } from '../../components/view-meals-records/view-meals-records-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import utils from 'src/utils/utils';

const ViewMealsRecords = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('All');
  const [mealsRecords, setMealsRecords] = useState([]);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  }

  const handleViewSubmit = async () => {
    console.log(selectedDate, selectedTime);
    const response = await fetch('/api/manager/getMealsRecords', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mealDate: utils.dateToSQLString(selectedDate),
        mealTime: selectedTime,
      }),
    });
    const data = await response.json();
    if(response.status == 200) {
      setMealsRecords(data);
    } else {
      setAlertData({
        severity: 'error',
        message: data.message,
        visible: true,
      });
    }
  }

  return (
    <>
      <Head>
        <title>
          View Meals Records | Centralized Mess
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <ViewMealsRecordsToolbar
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
            onSubmit={handleViewSubmit}
          />
          {alertData.visible && 
            <Alert sx={{marginBottom: 2}} severity={alertData.severity} variant="filled">{alertData.message}</Alert>
          }
          <Box sx={{ mt: 3 }}>
            <ViewMealsRecordsResults mealsRecords={mealsRecords}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}
ViewMealsRecords.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ViewMealsRecords;
