import Head from 'next/head';
import { useState } from 'react';
import { Box, Container, Alert } from '@mui/material';
import { ViewExtrasRecordsResults } from '../../components/view-extras-records/view-extras-records-results';
import { ViewExtrasRecordsToolbar } from '../../components/view-extras-records/view-extras-records-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import utils from 'src/utils/utils';

const ViewExtrasRecords = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('All');
  const [extrasRecords, setExtrasRecords] = useState([]);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  }

  const handleViewSubmit = async () => {
    console.log(selectedDate, selectedTime);
    const response = await fetch('/api/manager/getExtrasRecords', {
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
      setExtrasRecords(data);
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
          View Extras Records | Centralized Mess
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
          <ViewExtrasRecordsToolbar
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
            <ViewExtrasRecordsResults extrasRecords={extrasRecords}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}
ViewExtrasRecords.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ViewExtrasRecords;
