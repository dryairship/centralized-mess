import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { StudentEntry } from '../../components/student-entry/student-entry';
import { StudentEntryDetails } from '../../components/student-entry/student-entry-details';
import { DashboardLayout } from '../../components/dashboard-layout';
import { studentData as mockData } from '../../__mocks__/student-data';

const StudentEntryPage = () => {
  
  const [studentData, setStudentData] = useState(null);
  const [nonce, setNonce] = useState(0);

  const handleStudentIDSubmit = (studentId) => {
    let roll = "";
    if(studentId.startsWith("S")) {
      roll = studentId.substring(1,7);
    } else {
      roll = studentId;
    }
    console.log(roll);
    setStudentData(mockData);
  }

  const handleAddEntry = () => {
    console.log(studentData);
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
