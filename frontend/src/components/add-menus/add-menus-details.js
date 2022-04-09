import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectExtrasDialog } from './select-extras-dialog';

const menuTimes = ['Breakfast', 'Lunch', 'Dinner'];

export const AddMenusDetails = (props) => {

  const [extrasDialogOpen, setAddExtraDialogOpen] = useState(false);
  const [selectedExtrasMap, setSelectedExtrasMap] = useState({});
  const [extrasText, setExtrasText] = useState("");

  const handleExtrasChange = (event) => {
    setSelectedExtrasMap({
      ...selectedExtrasMap,
      [event.target.name]: event.target.checked,
    });
  }

  const openExtrasDialog = () => {
    setAddExtraDialogOpen(true);
  }

  const closeExtrasDialog = () => {
    setAddExtraDialogOpen(false);
  }

  const addExtrasDialogSubmit = () => {
    let addedExtrasTexts = props.availableExtras.filter((item) => selectedExtrasMap[item.item_id])
                            .map((item) => item.item_name + " (₹" + item.cost_per_item + ")");
    setExtrasText(addedExtrasTexts.join(", "));
    closeExtrasDialog();
    props.onChange(props.index, 'extras', props.availableExtras.map((item) => item.item_id).filter((itemId) => selectedExtrasMap[itemId]));
  }

  const handleChange = (event) => {
    props.onChange(props.index, event.target.name, event.target.value);
  };

  return (
    <Card sx={{border: 1}}>
      <CardHeader
        title={"#"+(props.index+1)}
        action={
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => props.onDelete(props.index)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
      </CardHeader>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Menu name"
              name="menuName"
              onChange={handleChange}
              required
              value={props.menu.menuName}
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Menu Time"
              name="menuTime"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={props.menu.menuTime}
              variant="outlined"
            >
              {menuTimes.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              fullWidth
              label="Menu Content"
              name="menuContent"
              onChange={handleChange}
              required
              multiline
              minRows={3}
              value={props.menu.menuContent}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              fullWidth
              label="Extra Items"
              name="extraItems"
              multiline
              minRows={3}
              InputProps={{readOnly: true}}
              value={extrasText}
              onClick={openExtrasDialog}
              variant="outlined"
            />
          </Grid>
          <SelectExtrasDialog
            open={extrasDialogOpen}
            onClose={closeExtrasDialog}
            onSubmit={addExtrasDialogSubmit}
            onChange={handleExtrasChange}
            availableExtras={props.availableExtras}
            selectedExtras={selectedExtrasMap}
          />
        </Grid>
      </CardContent>
    </Card>
  )
};
