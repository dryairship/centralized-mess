import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { ViewExtrasRequestsResults } from '../../components/view-extras-requests/view-extras-requests-results';
import { ViewExtrasRequestsToolbar } from '../../components/view-extras-requests/view-extras-requests-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { extrasRequests as mockRequests } from '../../__mocks__/extras-requests';

const ViewExtrasRequests = () => {
  const [nonce, setNonce] = useState(0);
  const [filter, setFilter] = useState('All');
  const [extrasRequests, setExtrasRequests] = useState([]);

  useEffect(async () => {
    const response = await fetch('/api/manager/getExtrasRequests');
    const fetchedRequests = await response.json();
    setExtrasRequests(fetchedRequests);
  }, [nonce]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleRefresh = () => {
    setNonce(Math.random());
  }

  const onDeleteRequest = (request) => {
    console.log("delete", request);
  }


  const onClaimRequest = (request) => {
    console.log("claim", request);
  }

  return (
    <>
      <Head>
        <title>
          View Extras Requests | Centralized Mess
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
          <ViewExtrasRequestsToolbar filter={filter} onFilterChange={handleFilterChange} onRefresh={handleRefresh} />
          <Box sx={{ mt: 3 }}>
            <ViewExtrasRequestsResults
              extrasRequests={extrasRequests}
              appliedFilter={filter}
              onDelete={onDeleteRequest}
              onClaimed={onClaimRequest}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
ViewExtrasRequests.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ViewExtrasRequests;
