import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Alert, Card, CardContent, Grid, Button, Avatar, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import ListIcon from '@mui/icons-material/List';
import LoginIcon from '@mui/icons-material/Login';

const Dashboard = () => {
  const [managerData, setManagerData] = useState(null);
  const [managerBills, setManagerBills] = useState(null);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  useEffect(async () => {
    setManagerData({
      pfNumber: localStorage.getItem('pfNumber'),
      name: localStorage.getItem('name'),
      phoneNumber: localStorage.getItem('phoneNumber'),
      email: localStorage.getItem('email'),
    });
  }, []);

  return (
    <>
      <Head>
        <title>
          Manager Dashboard | Centralized Mess
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
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              m: -1
            }}
          >
            {managerData ? 
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      alignItems: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      mt: -2,
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h5"
                    >
                      {`${managerData.name} • ${managerData.pfNumber}`}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      gutterBottom
                    >
                      {`${managerData.phoneNumber} • ${managerData.email}`}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            : ""}
          </Box>
          {alertData.visible && 
            <Alert sx={{marginBottom: 2}} severity={alertData.severity} variant="filled">{alertData.message}</Alert>
          }
          <Box m={2} pt={3} gap={2}>
            <Button variant="contained" startIcon={<LoginIcon />} sx={{mb: 2}} href="/manager/student-entry">
              Manage Student Entry
            </Button>
            <br/>
            <Button variant="contained" startIcon={<ListIcon />}  href="/manager/view-extras-requests">
              View Extras Requests
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
