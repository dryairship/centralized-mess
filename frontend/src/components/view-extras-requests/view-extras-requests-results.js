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
  Popover,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

export const ViewExtrasRequestsResults = ({ extrasRequests, appliedFilter, onDelete, onClaimed,...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [popoverData, setPopoverData] = useState({show: false, anchor: null, request: {}});
  const [filteredMenus, setFilteredMenus] = useState(extrasRequests);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePopoverClose = () => {
    setPopoverData({ ...popoverData, show: false});
  }

  const handleHover = (event, request) => {
    setPopoverData({ anchor: event.target, show: true, request: request});
  }

  useEffect(() => {
    setFilteredMenus(extrasRequests.filter((request) => appliedFilter === 'All' || appliedFilter === request.meal_time));
    setPage(0);
  }, [appliedFilter, extrasRequests]);

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
                <TableCell width="25%">
                  Request Time
                </TableCell>
                <TableCell width="20%">
                  Student
                </TableCell>
                <TableCell width="20%">
                  Item
                </TableCell>
                <TableCell width="10%">
                  Quantity
                </TableCell>
                <TableCell width="15%">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMenus.slice(page*limit, (page+1)*limit).map((request) => (
                <TableRow
                  hover
                  key={request.time_id}
                >
                  <TableCell>
                    {new Date(request.time_id).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Box
                     onClick={(e) => handleHover(e, request)}
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={`https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${request.roll_number}_0.jpg`}
                        sx={{ mr: 2 }}
                      >
                        {request.name}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {request.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {request.item_name}
                  </TableCell>
                  <TableCell>
                    {request.quantity}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="claim"
                      color="success"
                      onClick={() => onClaimed(request)}
                    >
                      <DoneIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <Popover
        open={popoverData.show}
        anchorEl={popoverData.anchor}
        onClose={handlePopoverClose}
        elevation={24}
        align="center"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box border={"1px solid red"} borderRadius={1} padding={3}>
          <Avatar
            src={`https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${popoverData.request.roll_number}_0.jpg`}
            alt={popoverData.request.name}
            sx={{
              height: 150,
              mb: 2,
              width: 150
            }}
          />
          <Typography
            color="textPrimary"
            align="center"
            variant="h5"
          >
            {popoverData.request.name}
          </Typography>
          <Typography
            color="textPrimary"
            align="center"
            variant="h6"
          >
            {popoverData.request.roll_number}
          </Typography>
        </Box>
      </Popover>
      <TablePagination
        component="div"
        count={filteredMenus.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ViewExtrasRequestsResults.propTypes = {
  extrasRequests: PropTypes.array.isRequired
};
