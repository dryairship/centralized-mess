import Head from 'next/head';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ViewExtrasCostsResults } from '../../components/view-extras-costs/view-extras-costs-results';
import { ViewExtrasCostsToolbar } from '../../components/view-extras-costs/view-extras-costs-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { extrasCosts } from '../../__mocks__/extras-costs';

const ViewExtrasCosts = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('All');

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  }

  const handleTimeChange = (event) => {
    console.log(event.target.value);
    setSelectedTime(event.target.value);
  }

  const onDeleteMeal = (meal) => {
    console.log(meal);
  }

  const handleViewSubmit = () => {
    console.log(selectedDate, selectedTime);
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
