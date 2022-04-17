import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const menuTimes = ['All', 'Breakfast', 'Lunch', 'Dinner'];

export const ManageExtrasToolbar = ({onFilterChange, setAlertData, refresh, ...props}) => {
  const [addExtraDialogOpen, setAddExtraDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({itemName: '', costPerItem: ''});
  
  const handleClickAddExtra = () => {
    setAddExtraDialogOpen(true);
  };
  
  const handleAddExtraClose = () => {
    setAddExtraDialogOpen(false);
  };

  const handleChange = (event) => {
    setNewItem({
      ...newItem,
      [event.target.name]: event.target.value
    });
  }; 

  const handleAddExtraSubmit = async () => {
    handleAddExtraClose();
    const response = await fetch('/api/manager/addExtraItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemName: newItem.itemName,
        costPerItem: newItem.costPerItem,
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
      setNewItem({itemName: '', costPerItem: ''});
    }
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Manage Extra Items
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClickAddExtra}
          >
            Add Extra Items
          </Button>
        </Box>
        <Dialog
          fullWidth
          maxWidth={'xs'}
          open={addExtraDialogOpen}
          onClose={handleAddExtraClose}
        >
          <DialogTitle>Add Extra Item Details</DialogTitle>
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: '100%',
                gap: 3,
                mt: 3,
              }}
            >
              <TextField
                fullWidth
                label="Item name"
                name="itemName"
                onChange={handleChange}
                required
                value={newItem.itemName}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Cost per item"
                name="costPerItem"
                onChange={handleChange}
                required
                value={newItem.costPerItem}
                variant="outlined"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color='success' variant='contained' onClick={handleAddExtraSubmit}>Add Item</Button>
            <Button color='error' variant='contained' onClick={handleAddExtraClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
