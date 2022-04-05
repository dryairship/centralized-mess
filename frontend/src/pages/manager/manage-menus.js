import Head from 'next/head';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ManageMenusResults } from '../../components/manage-menus/manage-menus-results';
import { ManageMenusToolbar } from '../../components/manage-menus/manage-menus-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { menus } from '../../__mocks__/menus';

const ManageMenus = () => {
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
          Manage Menus | Centralized Mess
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
          <ManageMenusToolbar filter={filter} onFilterChange={handleFilterChange} />
          <Box sx={{ mt: 3 }}>
            <ManageMenusResults menus={menus} appliedFilter={filter} onDelete={onDeleteMenu}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}
ManageMenus.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ManageMenus;
