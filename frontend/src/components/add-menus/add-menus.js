import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
} from '@mui/material';
import { AddMenusDetails } from './add-menus-details';

export const AddMenus = (props) => {

  const [menus, setMenus] = useState([{menuName: '', menuTime:'Breakfast', menuContent:'', extras: []}]);

  const onChildChange = (index, field, value) => {
    setMenus([
      ...menus.slice(0,index),
      {
        ...menus[index],
        [field]: value,
      },
      ...menus.slice(index+1),
    ]);
  }

  const onChildDelete = (index) => {
    console.log("Deleting", index);
    setMenus([
      ...menus.slice(0,index),
      ...menus.slice(index+1),
    ]);
  }

  const onAddAnotherMenu = () => {
    setMenus([
      ...menus,
      {menuName: '', menuTime:'Breakfast', menuContent:'', extras: []},
    ]);
  }

  const onSaveMenus = () => {
    console.log(menus);
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card xs={{gap: 2}}>
        <Grid container spacing={2}>
          {menus.map((menu, index) => 
            <Grid item key={index}>
              <AddMenusDetails
                menu={menu}
                index={index}
                onChange={onChildChange}
                onDelete={onChildDelete}
                availableExtras={props.availableExtras}
              />
            </Grid>
          )}
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
          gap={3}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onAddAnotherMenu}
          >
            Add another menu
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={onSaveMenus}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
