import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AddMeals } from '../../components/add-meals/add-meals';
import { DashboardLayout } from '../../components/dashboard-layout';
import { extras } from '../../__mocks__/extras';
import { menus as mockMenus } from '../../__mocks__/menus';

const AddMealsPage = () => {
  const [menus, setMenus] = useState([]);

  useEffect(async () => {
    const response = await fetch('/api/manager/getMessMenus');
    const fetchedMenus = await response.json();
    setMenus(fetchedMenus);
  }, []);

  return (
    <>
      <Head>
        <title>
          Add Meals | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Add Meals
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AddMeals availableExtras={extras} availableMenus={menus}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

AddMealsPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AddMealsPage;
