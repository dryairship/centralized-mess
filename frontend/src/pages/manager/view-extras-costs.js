import Head from 'next/head';
import { useState } from 'react';
import { Box, Container, Alert } from '@mui/material';
import { ViewExtrasCostsResults } from '../../components/view-extras-costs/view-extras-costs-results';
import { ViewExtrasCostsToolbar } from '../../components/view-extras-costs/view-extras-costs-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { extrasCosts as mockCosts } from '../../__mocks__/extras-costs';

const dateToSQLString = (date) => {
  if(!date) return date;
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const ViewExtrasCosts = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('All');
  const [extrasCosts, setExtrasCosts] = useState([]);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  }

  const handleViewSubmit = async () => {
    console.log(selectedDate, selectedTime);
    const response = await fetch('/api/manager/getExtrasCosts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mealDate: dateToSQLString(selectedDate),
        mealTime: selectedTime,
      }),
    });
    const data = await response.json();
    if(response.status == 200) {
      setExtrasCosts(data);
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
          View Extras Costs | Centralized Mess
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
          <ViewExtrasCostsToolbar
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
            <ViewExtrasCostsResults extrasCosts={extrasCosts}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}
ViewExtrasCosts.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ViewExtrasCosts;
