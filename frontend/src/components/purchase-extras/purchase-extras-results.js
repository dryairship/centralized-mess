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
  Button,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PurchaseExtrasDialog } from './purchase-extras-dialog';
import utils from '../../utils/utils';


const dateToSQLString = (date) => {
  if(!date) return date;
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const PurchaseExtrasResults = ({ meal, extras, setAlertData, refresh, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePurchaseClick = () => {
    setBuyDialogOpen(true);
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onDelete = async (item) => {
    const response = await fetch('/api/student/deleteUnclaimedExtraItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timeId: item.time_id,
      }),
    });
    const data = await response.json();
    setAlertData({
      severity: response.status == 200 ? 'success' : 'error',
      message: data.message,
      visible: true,
    });
    if (response.status == 200) {
      const mealDate = new Date(Date.parse(meal.meal_date));
      refresh(meal.mess_id, mealDate, meal.meal_time);
    }
  }

  const handleBuy = async (itemId, quantity) => {
    setBuyDialogOpen(false);
    const mealDate = new Date(Date.parse(meal.meal_date));
    const response = await fetch('/api/student/purchaseExtraItems', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messId: meal.mess_id,
        itemId: parseInt(itemId),
        quantity: quantity,
        mealTime: meal.meal_time,
        mealDate: utils.dateToSQLString(mealDate),
      }),
    });
    const data = await response.json();
    setAlertData({
      severity: response.status == 200 ? 'success' : 'error',
      message: data.message,
      visible: true,
    });
    if (response.status == 200) refresh(meal.mess_id, mealDate, meal.meal_time);
  }

  return (
    <Card {...rest}>
      <PurchaseExtrasDialog open={buyDialogOpen} setOpen={setBuyDialogOpen} extras={meal.extraItems} onBuy={handleBuy}/>
      <PerfectScrollbar>
      <Box ml={6}>
        <Typography
          color="textPrimary"
          variant="a"
          gutterBottom
          mb={5}
        >
            Mess: Hall {meal.mess_id} Mess <br/>
            Date: {utils.returnedDateToLocalDate(meal.meal_date)} <br/>
            Time: {meal.meal_time} <br/>
            Basic Menu: {meal.contents} <br/>
            Extras: {meal.extras} <br/>
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={handlePurchaseClick}
          sx={{mt: 2}}
        >
          Purchase Extra Items
        </Button>
      </Box>
      <Typography
        color="textPrimary"
        variant="h6"
        gutterBottom
        mb={1}
        ml={1}
        mt={4}
      >
        Unclaimed Purchased Extras
      </Typography>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="20%">
                  Buy Time
                </TableCell>
                <TableCell width="20%">
                  Item Name
                </TableCell>
                <TableCell width="20%">
                  Price Per Item
                </TableCell>
                <TableCell width="10%">
                  Quantity
                </TableCell>
                <TableCell width="20%">
                  Total Cost
                </TableCell>
                <TableCell width="10%">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {extras.slice(page*limit, (page+1)*limit).map((item) => (
                <TableRow
                  hover
                  key={item.item_id}
                >
                  <TableCell>
                    {utils.returnedDateToLocalDate(item.time_id)}
                  </TableCell>
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
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => onDelete(item)}
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
        count={extras.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PurchaseExtrasResults.propTypes = {
  extras: PropTypes.array.isRequired
};
