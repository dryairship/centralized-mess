import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from '@appannie/react-infinite-calendar';
import '@appannie/react-infinite-calendar/styles.css';

const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

export const AddMealsDetails = (props) => {

  const handleChange = (event) => {
    props.onChange(props.index, event.target.name, event.target.value);
  };

  const handleMenuChange = (event) => {
    props.onChange(props.index, "mealMenu", JSON.parse(event.target.value));
  };

  const handleDateSelect = (selectedDate) => {
    let newDates = defaultMultipleDateInterpolation(selectedDate, props.meal.mealDates);
    props.onChange(props.index, "mealDates", newDates);
  }

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
        <Grid container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item md={6}>
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

            <Grid item md={6}>
              <TextField
                fullWidth
                label="Meal Menu"
                name="mealMenu"
                onChange={handleMenuChange}
                required
                select
                SelectProps={{ native: true }}
                value={props.meal.mealMenu}
                variant="outlined"
              >
                {props.availableMenus.filter((menu) => props.meal.mealTime===menu.menu_time).map((menu) => (
                  <option
                    key={menu.menu_id}
                    value={JSON.stringify(menu)}
                  >
                    {menu.menu_name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item md={6} xs={12}>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Select Dates
              </Typography>
              <InfiniteCalendar
                Component={withMultipleDates(Calendar)}
                selected={props.meal.mealDates}
                minDate={new Date()}
                width={300}
                height={200}
                name="mealDates"
                onSelect={handleDateSelect}
                displayOptions={{showHeader: false}}
                interpolateSelection={defaultMultipleDateInterpolation}
              />
            </Grid>

            <Grid item container md={6}>
              <TextField
                fullWidth
                label="Meal Content"
                name="mealContent"
                required
                InputProps={{readOnly: true}}
                multiline
                minRows={8}
                value={props.meal.mealMenu ? props.meal.mealMenu.contents : ""}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};
