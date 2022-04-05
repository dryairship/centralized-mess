import Head from 'next/head';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ManageMealCostsResults } from '../../components/manage-meal-costs/manage-meal-costs-results';
import { ManageMealCostsToolbar } from '../../components/manage-meal-costs/manage-meal-costs-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { meals as mealCosts } from '../../__mocks__/meals';

const ManageMealCosts = () => {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const onDeleteMeal = (meal) => {
    console.log(meal);
  }

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
