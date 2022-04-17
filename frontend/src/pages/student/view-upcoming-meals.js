import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { ManageMealsResults } from '../../components/view-upcoming-meals/view-upcoming-meals-results';
import { ViewUpcomingMealsToolbar } from '../../components/view-upcoming-meals/view-upcoming-meals-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { meals as mockMeals } from '../../__mocks__/meals';

const dateToSQLString = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const ViewUpcomingMeals = () => {
  const [meals, setMeals] = useState([]);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleToolbarSubmit = async (selectedDate, selectedTime) => {
    const response = await fetch('/api/student/getUpcomingMeals', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: dateToSQLString(selectedDate),
        time: selectedTime,
      }),
    });
    const data = await response.json();
    if(response.status == 200) {
      for (let i = 0; i < data.length; i++) {
        const extrasTexts = data[i].extraItems.map((item) => item.item_name + " (₹" + item.cost_per_item + ")");
        data[i].extras = extrasTexts.join(", ");
      }
      setMeals(data);
      console.log(data);
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
          View Upcoming Meals | Centralized Mess
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
          <ViewUpcomingMealsToolbar onSubmit={handleToolbarSubmit} />
          <Box sx={{ mt: 3 }}>
            <ManageMealsResults meals={meals}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

ViewUpcomingMeals.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ViewUpcomingMeals;
