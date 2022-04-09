import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AddMenus } from '../../components/add-menus/add-menus';
import { DashboardLayout } from '../../components/dashboard-layout';
import { extras as mockExtras } from '../../__mocks__/extras';

const AddMenusPage = () => {

  const [extras, setExtras] = useState([]);
  useEffect(async () => {
    const response = await fetch('/api/manager/getMessExtras');
    const fetchedExtras = await response.json();
    setExtras(fetchedExtras);
  }, []);


  return (
    <>
      <Head>
        <title>
          Add Menus | Centralized Mess
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
            Add Menus
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
              <AddMenus availableExtras={extras}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

AddMenusPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AddMenusPage;
