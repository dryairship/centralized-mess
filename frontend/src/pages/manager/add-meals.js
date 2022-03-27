import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AddMeals } from '../../components/add-meals/add-meals';
import { AddMealsDetails } from '../../components/add-meals/add-meals-details';
import { DashboardLayout } from '../../components/dashboard-layout';

const AddMealsPage = () => (
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
            lg={4}
            md={6}
            xs={12}
          >
            <AddMeals />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AddMealsDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

AddMealsPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AddMealsPage;
