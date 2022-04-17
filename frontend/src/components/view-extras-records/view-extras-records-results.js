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

export const ViewExtrasRecordsResults = ({ extrasRecords, ...rest }) => {
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
                <TableCell width="20%">
                  Time
                </TableCell>
                <TableCell width="20%">
                  Student
                </TableCell>
                <TableCell width="20%">
                  Item Name
                </TableCell>
                <TableCell width="20%">
                  Quantity
                </TableCell>
                <TableCell width="20%">
                  Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {extrasRecords.slice(page*limit, (page+1)*limit).map((item, i) => (
                <TableRow
                  hover
                  key={i}
                >
                  <TableCell>
                    {utils.returnedDateToLocalTime(item.time_id)}
                  </TableCell>
                  <TableCell>
                    {item.roll_number}
                  </TableCell>
                  <TableCell>
                    {item.item_name}
                  </TableCell>
                  <TableCell>
                    {item.quantity}
                  </TableCell>
                  <TableCell>
                    ₹ {item.cost}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={extrasRecords.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ViewExtrasRecordsResults.propTypes = {
  meals: PropTypes.array.isRequired
};
