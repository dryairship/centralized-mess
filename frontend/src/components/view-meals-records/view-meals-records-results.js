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
import utils from 'src/utils/utils';

export const ViewMealsRecordsResults = ({ mealsRecords, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="40%">
                  Date & Time
                </TableCell>
                <TableCell width="20%">
                  Meal Time
                </TableCell>
                <TableCell width="20%">
                  Student
                </TableCell>
                <TableCell width="20%">
                  Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mealsRecords.slice(page*limit, (page+1)*limit).map((meal, i) => (
                <TableRow
                  hover
                  key={i}
                >
                  <TableCell>
                    {utils.returnedDateToLocalString(meal.time_id)}
                  </TableCell>
                  <TableCell>
                    {meal.meal_time}
                  </TableCell>
                  <TableCell>
                    {meal.roll_number}
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
        count={mealsRecords.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ViewMealsRecordsResults.propTypes = {
  meals: PropTypes.array.isRequired
};
