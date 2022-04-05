import Head from 'next/head';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ManageMealsResults } from '../../components/manage-meals/manage-meals-results';
import { ManageMealsToolbar } from '../../components/manage-meals/manage-meals-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { meals } from '../../__mocks__/meals';

const ManageMeals = () => {
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
          Manage Meals | Centralized Mess
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
          <ManageMealsToolbar filter={filter} onFilterChange={handleFilterChange} />
          <Box sx={{ mt: 3 }}>
            <ManageMealsResults meals={meals} appliedFilter={filter} onDelete={onDeleteMeal}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}
ManageMeals.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ManageMeals;
