import Head from 'next/head';
import { useState, udeEffect, useEffect } from 'react';
import { Box, Container, Alert } from '@mui/material';
import { ManageMealCostsResults } from '../../components/manage-meal-costs/manage-meal-costs-results';
import { ManageMealCostsToolbar } from '../../components/manage-meal-costs/manage-meal-costs-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { meals as mockMealCosts } from '../../__mocks__/meals';

const ManageMealCosts = () => {
  const [filter, setFilter] = useState('All');
  const [mealCosts, setMealCosts] = useState([]);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const onDeleteMeal = (meal) => {
    console.log(meal);
  }

  useEffect(async () => {
    const response = await fetch('/api/manager/getMessCompletedMeals');
    const data = await response.json();
    if(response.status == 200) {
      setMealCosts(data);
    } else {
      setAlertData({
        severity: 'error',
        message: data.message,
        visible: true,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Manage Meal Costs | Centralized Mess
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
          <ManageMealCostsToolbar filter={filter} onFilterChange={handleFilterChange} />
          {alertData.visible && 
            <Alert sx={{marginBottom: 2}} severity={alertData.severity} variant="filled">{alertData.message}</Alert>
          }
          <Box sx={{ mt: 3 }}>
            <ManageMealCostsResults mealCosts={mealCosts} appliedFilter={filter} onDelete={onDeleteMeal}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}
ManageMealCosts.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ManageMealCosts;
