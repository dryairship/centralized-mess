import Head from 'next/head';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ManageExtrasResults } from '../../components/manage-extras/manage-extras-results';
import { ManageExtrasToolbar } from '../../components/manage-extras/manage-extras-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { extras } from '../../__mocks__/extras';

const ManageExtras = () => {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const onDeleteMenu = (menu) => {
    console.log(menu);
  }

  return (
    <>
      <Head>
        <title>
          Manage Extras | Centralized Mess
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
          <ManageExtrasToolbar />
          <Box sx={{ mt: 3 }}>
            <ManageExtrasResults extras={extras} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
ManageExtras.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ManageExtras;
