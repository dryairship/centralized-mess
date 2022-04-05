import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';

const mealTimes = ['All', 'Breakfast', 'Lunch', 'Dinner'];

export const ManageMealCostsToolbar = ({onFilterChange, ...props}) => {

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
          Manage Meal Costs
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                label="Filter by Time:"
                name="mealTime"
                onChange={onFilterChange}
                select
                SelectProps={{ native: true }}
                value={props.filter}
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}