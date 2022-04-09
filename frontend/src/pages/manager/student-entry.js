import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Alert } from '@mui/material';
import { StudentEntry } from '../../components/student-entry/student-entry';
import { StudentEntryDetails } from '../../components/student-entry/student-entry-details';
import { DashboardLayout } from '../../components/dashboard-layout';
import { studentData as mockData } from '../../__mocks__/student-data';

const StudentEntryPage = () => {
  
  const [studentData, setStudentData] = useState(null);
  const [nonce, setNonce] = useState(0);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const handleStudentIDSubmit = async (studentId) => {
    let roll = "";
    if(studentId.startsWith("S")) {
      roll = studentId.substring(1,7);
    } else {
      roll = studentId;
    }
    const response = await fetch('/api/manager/getStudentInfo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rollNumber: roll,
      }),
    });
    const data = await response.json();
    if (response.status == 200) {
      setStudentData(data);
      setAlertData({...alertData, visible: false});
    } else {
      setAlertData({
        severity: 'error',
        message: data.message,
        visible: true,
      });
    }
  }

  const handleAddEntry = async () => {
    const response = await fetch('/api/manager/addStudentEntry', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rollNumber: studentData.rollNumber,
      }),
    });
    const data = await response.json();
    setAlertData({
      severity: response.status == 200 ? 'success' : 'error',
      message: data.message,
      visible: true,
    });
    setNonce(Math.random());
    setStudentData(null);
  }

  return (
    <>
      <Head>
        <title>
          Student Entry | Centralized Mess
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
            Student Entry
          </Typography>
          {alertData.visible && 
            <Alert severity={alertData.severity} variant="filled">{alertData.message}</Alert>
          }
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <StudentEntryDetails onSubmit={handleStudentIDSubmit} nonce={nonce} />
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              {studentData && <StudentEntry studentData={studentData} onAddEntry={handleAddEntry}/>}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

StudentEntryPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default StudentEntryPage;
