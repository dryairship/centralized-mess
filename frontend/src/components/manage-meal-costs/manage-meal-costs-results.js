import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { EnterCostDialog } from './enter-cost-dialog';

export const ManageMealCostsResults = ({ mealCosts, appliedFilter, onDelete, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [filteredMealCosts, setFilteredMealCosts] = useState(mealCosts);
  const [addCostDialogData, setAddCostDialogData] = useState({meal: {}, visible: false});

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  useEffect(() => {
    setFilteredMealCosts(mealCosts.filter((meal) => appliedFilter === 'All' || appliedFilter === meal.meal_time));
  }, [appliedFilter]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const showAddCostDialog = (meal) => {
    setAddCostDialogData({
      meal: meal,
      visible: true,
    });
  }

  const hideAddCostDialog = (meal) => {
    setAddCostDialogData({
      ...setAddCostDialogData,
      visible: false,
    });
  }

  const handleAddCostSubmit = (meal, totalCost) => {
    console.log(meal, totalCost);
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="33%">
                  Date
                </TableCell>
                <TableCell width="33%">
                  Time
                </TableCell>
                <TableCell width="33%">
                  Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMealCosts.slice(page*limit, (page+1)*limit).map((meal, i) => (
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
                    {meal.total_cost != null ? "₹ "+meal.total_cost : 
                      <Button
                        variant="contained" 
                        startIcon={<AddBoxIcon />} 
                        onClick={() => showAddCostDialog(meal)}>
                        Add Cost
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

      <EnterCostDialog
        open={addCostDialogData.visible}
        onClose={hideAddCostDialog}
        meal={addCostDialogData.meal}
        onSubmit={handleAddCostSubmit}
      />
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredMealCosts.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ManageMealCostsResults.propTypes = {
  mealCosts: PropTypes.array.isRequired
};