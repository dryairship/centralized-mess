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

export const ViewExtrasCostsResults = ({ extrasCosts, ...rest }) => {
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
                  Item Name
                </TableCell>
                <TableCell width="20%">
                  Cost Per Item
                </TableCell>
                <TableCell width="20%">
                  Quantity Sold
                </TableCell>
                <TableCell width="20%">
                  Total Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {extrasCosts.slice(page*limit, (page+1)*limit).map((item, i) => (
                <TableRow
                  hover
                  key={i}
                >
                  <TableCell>
                    {item.item_name}
                  </TableCell>
                  <TableCell>
                    ₹ {item.cost_per_item}
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
        count={extrasCosts.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ViewExtrasCostsResults.propTypes = {
  meals: PropTypes.array.isRequired
};
