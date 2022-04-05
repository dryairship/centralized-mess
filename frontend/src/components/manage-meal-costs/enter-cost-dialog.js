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

export const EnterCostDialog = (props) => {

  const [totalCost, setTotalCost] = useState("");

  const handleChange = (event) => {
    setTotalCost(event.target.value);
  }

  const handleClose = () => {
    props.onClose();
    setTotalCost("");
  }

  const onSubmit = (event) => {
    props.onSubmit(props.meal, totalCost);
    handleClose();
  }

  return  props.meal ? (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Enter Meal Cost</DialogTitle>
      <DialogContent>
        <form>
          <Card>
            <CardContent>
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                  xs={12}
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                  >
                    Enter the total cost for {props.meal.meal_time} on {props.meal.meal_date}:
                  </Typography>

                  <TextField
                    fullWidth
                    label="Total Cost"
                    name="totalCost"
                    onChange={handleChange}
                    required
                    value={totalCost}
                    variant="outlined"
                  />
                </Grid>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='success' variant='contained' onClick={onSubmit}>Submit Meal Cost</Button>
        <Button color='error' variant='contained' onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  ) : "";
}
