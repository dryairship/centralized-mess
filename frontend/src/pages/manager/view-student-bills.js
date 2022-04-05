import Head from 'next/head';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ViewStudentBillsMeals } from '../../components/view-student-bills/view-student-bills-meals';
import { ViewStudentBillsExtras } from '../../components/view-student-bills/view-student-bills-extras';
import { ViewStudentBillsToolbar } from '../../components/view-student-bills/view-student-bills-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { studentBills as mockBills } from '../../__mocks__/student-bills';

const ViewStudentBills = () => {
  const [studentBills, setStudentBills] = useState(null);

  const handleViewSubmit = (student) => {
    setStudentBills(mockBills);
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
