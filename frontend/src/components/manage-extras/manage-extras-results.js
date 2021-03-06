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
import EditIcon from '@mui/icons-material/Edit';

export const ManageExtrasResults = ({ refresh, setAlertData, extras, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const onDelete = async (item) => {
    const response = await fetch('/api/manager/deleteExtraItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemId: item.item_id,
      }),
    });
    const data = await response.json();
    setAlertData({
      severity: response.status == 200 ? 'success' : 'error',
      message: data.message,
      visible: true,
    });
    if (response.status == 200) {
      refresh();
    }
  }

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
                  Name
                </TableCell>
                <TableCell width="20%">
                  Price Per Item
                </TableCell>
                <TableCell width="20%">
                  Action
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
                    {item.item_name}
                  </TableCell>
                  <TableCell>
                    {item.cost_per_item}
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

ManageExtrasResults.propTypes = {
  extras: PropTypes.array.isRequired
};
