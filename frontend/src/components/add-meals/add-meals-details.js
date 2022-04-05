import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

export const AddMealsDetails = (props) => {

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
              label="Meal name"
              name="mealName"
              onChange={handleChange}
              required
              value={props.meal.mealName}
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
              label="Meal Time"
              name="mealTime"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={props.meal.mealTime}
              variant="outlined"
            >
              {mealTimes.map((option) => (
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
              label="Meal Content"
              name="mealContent"
              onChange={handleChange}
              required
              multiline
              minRows={3}
              value={props.meal.mealContent}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};
