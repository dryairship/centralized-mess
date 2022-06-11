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
import utils from '../../utils/utils';

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
    setPage(0);
  }, [appliedFilter, mealCosts]);

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

  const handleAddCostSubmit = async (meal, totalCost) => {
    console.log(meal, totalCost);
    const response = await fetch('/api/manager/addMealCost', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mealDate: utils.returnedDateToSQLString(meal.meal_date),
        mealTime: meal.meal_time,
        totalCost: totalCost,
      }),
    });
    const data = await response.json();
    if(response.status == 200) {
        let newMeal = meal;
        newMeal.total_cost = totalCost;
        setMealCosts(mealCosts.map(m => m.time_id == meal.time_id ? newMeal : m));
    } else {
      setAlertData({
        severity: 'error',
        message: data.message,
        visible: true,
      });
    }
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
                    {new Date(meal.meal_date).toLocaleDateString("IN")}
                  </TableCell>
                  <TableCell>
                    {meal.meal_time}
                  </TableCell>
                  <TableCell>
                    {meal.total_cost != null ? "₹ "+meal.total_cost.toFixed(2) : 
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
