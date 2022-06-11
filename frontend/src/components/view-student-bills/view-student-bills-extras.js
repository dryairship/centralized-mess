import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
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

export const ViewStudentBillsExtras = ({ studentBills, showMessName,...rest }) => {
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
        Extras Bills
      </Typography>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="20%">
                  Date
                </TableCell>
                {showMessName && 
                <TableCell width="20%">
                  Mess Name
                </TableCell>
                }
                <TableCell width="20%">
                  Meal Time
                </TableCell>
                <TableCell width="20%">
                  Item Name
                </TableCell>
                <TableCell width="5%">
                  Quantity
                </TableCell>
                <TableCell width="15%">
                  Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentBills.extrasBills.slice(page*limit, (page+1)*limit).map((item, i) => (
                <TableRow
                  hover
                  key={i}
                >
                  <TableCell>
                    {item.meal_date.substring(0, item.meal_date.indexOf("T"))}
                  </TableCell>
                  {showMessName &&
                    <TableCell>
                      {item.name}
                    </TableCell>
                  }
                  <TableCell>
                    {item.meal_time}
                  </TableCell>
                  <TableCell>
                    {item.item_name}
                  </TableCell>
                  <TableCell>
                    {item.quantity}
                  </TableCell>
                  <TableCell>
                    ₹ {item.cost.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={studentBills ? studentBills.extrasBills.length : 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  ) : "";
};

ViewStudentBillsExtras.propTypes = {
  meals: PropTypes.array.isRequired
};
