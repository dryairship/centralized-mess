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

export const ManageMenusResults = ({ menus, appliedFilter, onDelete, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [filteredMenus, setFilteredMenus] = useState(menus);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  useEffect(() => {
    setFilteredMenus(menus.filter((menu) => appliedFilter === 'All' || appliedFilter === menu.menu_time));
  }, [appliedFilter]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="23%">
                  Name
                </TableCell>
                <TableCell width="20%">
                  Time
                </TableCell>
                <TableCell width="47%">
                  Contents
                </TableCell>
                <TableCell width="10%">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMenus.slice(page*limit, (page+1)*limit).map((menu) => (
                <TableRow
                  hover
                  key={menu.menu_id}
                >
                  <TableCell>
                    {menu.menu_name}
                  </TableCell>
                  <TableCell>
                    {menu.menu_time}
                  </TableCell>
                  <TableCell>
                    {menu.contents}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => onDelete(menu)}
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

ManageMenusResults.propTypes = {
  menus: PropTypes.array.isRequired
};
