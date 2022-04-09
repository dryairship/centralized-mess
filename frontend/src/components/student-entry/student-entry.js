import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export const StudentEntry = ({studentData, onAddEntry}) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
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
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {studentData.name}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h6"
          >
            {studentData.rollNumber}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h6"
            gutterBottom
          >
            {`${studentData.phoneNumber} • ${studentData.email}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
          {studentData.address}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          onClick={onAddEntry}
        >
          Add Entry
        </Button>
      </CardActions>
    </Card>
  );
}
