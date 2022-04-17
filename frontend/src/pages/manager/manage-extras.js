import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Alert } from '@mui/material';
import { ManageExtrasResults } from '../../components/manage-extras/manage-extras-results';
import { ManageExtrasToolbar } from '../../components/manage-extras/manage-extras-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { extras as mockExtras } from '../../__mocks__/extras';

const ManageExtras = () => {
  const [filter, setFilter] = useState('All');
  const [extras, setExtras] = useState([]);
  const [nonce, setNonce] = useState(0);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const onDeleteMenu = (menu) => {
    console.log(menu);
  }

  const refresh = () => {
    setNonce(Math.random());
  }

  useEffect(async () => {
    const response = await fetch('/api/manager/getMessExtras');
    const fetchedExtras = await response.json();
    setExtras(fetchedExtras);
  }, [nonce]);

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
          <ManageExtrasToolbar refresh={refresh} setAlertData={setAlertData} />
          {alertData.visible && 
            <Alert sx={{marginBottom: 2}} severity={alertData.severity} variant="filled">{alertData.message}</Alert>
          }
          <Box sx={{ mt: 3 }}>
            <ManageExtrasResults extras={extras} refresh={refresh} setAlertData={setAlertData} />
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
