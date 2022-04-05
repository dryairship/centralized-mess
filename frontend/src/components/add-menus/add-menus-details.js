import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const menuTimes = ['Breakfast', 'Lunch', 'Dinner'];

export const AddMenusDetails = (props) => {

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
        </Grid>
      </CardContent>
    </Card>
  )
};
