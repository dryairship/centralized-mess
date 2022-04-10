import Head from 'next/head';
import { useState } from 'react';
import { Box, Container, Alert } from '@mui/material';
import { ViewStudentBillsMeals } from '../../components/view-student-bills/view-student-bills-meals';
import { ViewStudentBillsExtras } from '../../components/view-student-bills/view-student-bills-extras';
import { ViewStudentBillsToolbar } from '../../components/view-student-bills/view-student-bills-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { studentBills as mockBills } from '../../__mocks__/student-bills';

const ViewStudentBills = () => {
  const [studentBills, setStudentBills] = useState(null);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleViewSubmit = async (studentRoll) => {
    console.log(studentRoll);
    const response = await fetch('/api/manager/getStudentBills', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({rollNumber: studentRoll}),
    });
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
  }

  return (
    <>
      <Head>
        <title>
          View Student Bills | Centralized Mess
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
          <ViewStudentBillsToolbar
            studentBills={studentBills}
            onSubmit={handleViewSubmit}
          />
          {alertData.visible && 
            <Alert sx={{marginBottom: 2}} severity={alertData.severity} variant="filled">{alertData.message}</Alert>
          }
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            <ViewStudentBillsMeals studentBills={studentBills}/>
            <ViewStudentBillsExtras studentBills={studentBills}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}
ViewStudentBills.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ViewStudentBills;
