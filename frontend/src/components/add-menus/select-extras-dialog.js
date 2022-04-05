import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  CardHeader,
  FormControlLabel,
  Typography,
  Divider,
  Grid,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

export const SelectExtrasDialog = (props) => {
  return (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>Select Extra Items</DialogTitle>
      <DialogContent>
        <form>
          <Card>
            <CardContent>
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  xs={12}
                >
                  {props.availableExtras.map((item) => (
                    <FormControlLabel
                      key={item.item_id}
                      control={(
                        <Checkbox
                          name={item.item_id}
                          color="primary"
                          onChange={props.onChange}
                          checked={props.selectedExtras[item.item_id] || false}
                        />
                      )}
                      label={item.item_name + " (₹" + item.cost_per_item + ")"}
                    />
                  ))}
                </Grid>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='success' variant='contained' onClick={props.onSubmit}>Add Selected Items</Button>
        <Button color='error' variant='contained' onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
