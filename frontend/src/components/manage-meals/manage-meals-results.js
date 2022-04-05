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
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [filteredMeals, setFilteredMeals] = useState(meals);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  useEffect(() => {
    setFilteredMeals(meals.filter((meal) => appliedFilter === 'All' || appliedFilter === meal.meal_time));
  }, [appliedFilter]);

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
                  Date
                </TableCell>
                <TableCell width="20%">
                  Time
                </TableCell>
                <TableCell width="50%">
                  Menu
                </TableCell>
                <TableCell width="10%">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMeals.slice(page*limit, (page+1)*limit).map((meal, i) => (
                <TableRow
                  hover
                  key={i}
                >
                  <TableCell>
                    {meal.meal_date}
                  </TableCell>
                  <TableCell>
                    {meal.meal_time}
                  </TableCell>
                  <TableCell>
                    {meal.contents}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => onDelete(meal)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredMeals.length}
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
