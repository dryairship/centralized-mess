import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Alert, Card, CardContent, Avatar, Typography } from '@mui/material';
import { ViewStudentBillsMeals } from '../../components/view-student-bills/view-student-bills-meals';
import { ViewStudentBillsExtras } from '../../components/view-student-bills/view-student-bills-extras';
import { DashboardLayout } from '../../components/dashboard-layout';
import { studentBills as mockBills } from '../../__mocks__/student-bills';

const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [studentBills, setStudentBills] = useState(null);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  useEffect(async () => {
    setStudentData({
      rollNumber: localStorage.getItem('rollNumber'),
      name: localStorage.getItem('name'),
      phoneNumber: localStorage.getItem('phoneNumber'),
      email: localStorage.getItem('email'),
      address: localStorage.getItem('address'),
    });
    const response = await fetch('/api/student/getStudentBills');
    const data = await response.json();
    if(response.status == 200) {
      setStudentBills(data);
    } else {
      setAlertData({
        severity: 'error',
        message: data.message,
        visible: true,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Student Dashboard | Centralized Mess
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
            {studentData && studentBills ? 
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
                  <Avatar
                    src={`https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${studentData.rollNumber}_0.jpg`}
                    alt={studentData.name}
                    sx={{
                      height: 150,
                      mb: 2,
                      width: 150
                    }}
                  />

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
                      {`${studentData.name} • ${studentData.rollNumber}`}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      gutterBottom
                    >
                      {`${studentData.phoneNumber} • ${studentData.email} • ${studentData.address}`}
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h6"
                      gutterBottom
                    >
                      Basic Meals Bill: ₹ {studentBills.basicBills.map((meal) => meal.cost).reduce((a, b) => a + b, 0)} • 
                      Extras Bill: ₹ {studentBills.extrasBills.map((extra) => extra.cost).reduce((a, b) => a + b, 0)} <br/>
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h6"
                    >
                      Total Bill Amount: ₹ {studentBills.basicBills.map((meal) => meal.cost).reduce((a, b) => a + b, 0) + 
                                            studentBills.extrasBills.map((extra) => extra.cost).reduce((a, b) => a + b, 0)}
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
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            <ViewStudentBillsMeals showMessName={true} studentBills={studentBills}/>
            <ViewStudentBillsExtras showMessName={true} studentBills={studentBills}/>
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
