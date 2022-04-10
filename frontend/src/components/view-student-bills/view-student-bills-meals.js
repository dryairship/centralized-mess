import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ViewStudentBillsMeals = ({ studentBills, showMessName, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return studentBills ? (
    <Card {...rest}>
      <Typography
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        Basic Meals Bills
      </Typography>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="40%">
                  Date
                </TableCell>
                {showMessName && 
                <TableCell width="40%">
                  Mess Name
                </TableCell>
                }
                <TableCell width="40%">
                  Meal Time
                </TableCell>
                <TableCell width="20%">
                  Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentBills.basicBills.slice(page*limit, (page+1)*limit).map((meal, i) => (
                <TableRow
                  hover
                  key={i}
                >
                  <TableCell>
                    {meal.meal_date.substring(0, meal.meal_date.indexOf("T"))}
                  </TableCell>
                  {showMessName &&
                    <TableCell>
                      {meal.name}
                    </TableCell>
                  }
                  <TableCell>
                    {meal.meal_time}
                  </TableCell>
                  <TableCell>
                    ₹ {meal.cost}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={studentBills ? studentBills.basicBills.length : 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  ) : "";
};

ViewStudentBillsMeals.propTypes = {
  meals: PropTypes.array.isRequired
};
