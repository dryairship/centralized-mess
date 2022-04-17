import { useState, useEffect } from 'react';
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

export const PurchaseExtrasDialog = ({open, setOpen, extras, onBuy, ...props}) => {
  const [purchaseData, setPurchaseData] = useState({itemId: 0, quantity: 1});
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setPurchaseData({
      ...purchaseData,
      [event.target.name]: event.target.value
    });
  };

  const handleBuy = () => {
    onBuy(purchaseData.itemId, purchaseData.quantity);
    setPurchaseData({itemId: extras[0].item_id, quantity: 1});
  }

  useEffect(() => {
    if(extras && extras.length > 0) {
      setPurchaseData({
        itemId: extras[0].item_id,
        quantity: 1,
      });
    }
  }, [extras]);

  return (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Purchase Extra Items</DialogTitle>
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
            label="Choose Item:"
            name="itemId"
            onChange={handleChange}
            select
            SelectProps={{ native: true }}
            variant="outlined"
          >
            {extras.map((extraItem, i) => (
              <option
                key={i+1}
                value={extraItem.item_id}
                selected={purchaseData.itemId == extraItem.item_id}
              >
                {extraItem.item_name}
              </option>
            ))}
          </TextField>
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            value={purchaseData.quantity}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='success' variant='contained' onClick={handleBuy}>Purchase</Button>
        <Button color='error' variant='contained' onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
