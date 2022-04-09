import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  Alert,
} from '@mui/material';
import { AddMenusDetails } from './add-menus-details';

export const AddMenus = (props) => {

  const [menus, setMenus] = useState([{menuName: '', menuTime:'Breakfast', menuContent:'', extras: []}]);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

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

  const onSaveMenus = async () => {
    const response = await fetch('/api/manager/addMenus', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(menus),
    });
    const data = await response.json();
    setAlertData({
      severity: response.status == 200 ? 'success' : 'error',
      message: data.message,
      visible: true,
    });
    if(response.status == 200) {
      setMenus([]);
    }
  }

  return (
    <>
    {alertData.visible && 
      <Alert sx={{marginBottom: 2}} severity={alertData.severity} variant="filled">{alertData.message}</Alert>
    }
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
    </>
  );
};
