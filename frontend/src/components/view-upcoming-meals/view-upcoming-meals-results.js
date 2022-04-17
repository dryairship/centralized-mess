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

export const ManageMealsResults = ({ meals, appliedFilter, onDelete, ...rest }) => {
  const [limit, setLimit] = useState(25);
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
                <TableCell width="15%">
                  Mess Name
                </TableCell>
                <TableCell width="25%">
                  Basic Menu
                </TableCell>
                <TableCell width="60%">
                  Extras
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meals.slice(page*limit, (page+1)*limit).map((meal, i) => (
                <TableRow
                  hover
                  key={i}
                >
                  <TableCell>
                    {`Hall ${meal.mess_id} Mess`}
                  </TableCell>
                  <TableCell>
                    {meal.contents}
                  </TableCell>
                  <TableCell>
                    {meal.extras}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={meals.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ManageMealsResults.propTypes = {
  meals: PropTypes.array.isRequired
};
