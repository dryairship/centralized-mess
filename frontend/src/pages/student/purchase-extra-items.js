import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Alert } from '@mui/material';
import { PurchaseExtrasResults } from '../../components/purchase-extras/purchase-extras-results';
import { PurchaseExtrasToolbar } from '../../components/purchase-extras/purchase-extras-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { extras as mockExtras } from '../../__mocks__/extras';

const dateToSQLString = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const ManageExtras = () => {
  const [filter, setFilter] = useState('All');
  const [extras, setExtras] = useState(null);
  const [meal, setMeal] = useState(null);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const onToolbarSubmit = async (messId, date, time) => {
    //console.log(messId, date, time);
    const response = await fetch('/api/student/getMealDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messId: messId,
        date: dateToSQLString(date),
        time: time,
      }),
    });
    const data = await response.json();
    if(response.status == 200) {
      const extrasTexts = data.extraItems.map((item) => item.item_name + " (₹" + item.cost_per_item + ")");
      data.extras = extrasTexts.join(", ");
      setMeal(data);
    } else {
      setAlertData({
        severity: 'error',
        message: data.message,
        visible: true,
      });
    }
    const extrasResponse = await fetch('/api/student/getUnclaimedExtrasForMess', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({messId: messId}),
    });
    const extrasData = await extrasResponse.json();
    if(extrasResponse.status == 200) {
      setExtras(extrasData);
    } else {
      setAlertData({
        severity: 'error',
        message: extrasData.message,
        visible: true,
      });
    }
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
          <PurchaseExtrasToolbar onSubmit={onToolbarSubmit}/>
          {alertData.visible && 
            <Alert sx={{marginBottom: 2}} severity={alertData.severity} variant="filled">{alertData.message}</Alert>
          }
          {meal != null && extras != null && 
          <Box sx={{ mt: 3 }}>
            <PurchaseExtrasResults meal={meal} extras={extras} setAlertData={setAlertData} refresh={onToolbarSubmit}/>
          </Box>
          }
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
