import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

export const StudentEntryDetails = (props) => {
  const [studentID, setStudentId] = useState("");
  const [textFieldRef, setTextFieldRef] = useState(null);

  const onIDChange = (event) => {
    setStudentId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(studentID);
    setStudentId("");
    textFieldRef.focus();
  }

  useEffect(() => {
    if(textFieldRef) textFieldRef.focus();
  }, [textFieldRef, props.nonce]);

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Enter the roll number or scan the Student ID card"
          title="Student ID"
        />
        <CardContent>
          <TextField
            inputRef={el => { setTextFieldRef(el) }}
            fullWidth
            label="Student ID"
            name="studentID"
            onChange={onIDChange}
            required
            value={studentID}
            onClick={() => setStudentId("")}
            variant="outlined"
          />
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Find Student
          </Button>
        </Box>
      </Card>
    </form>
  );
};
