import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';

const menuTimes = ['All', 'Breakfast', 'Lunch', 'Dinner'];

export const ViewExtrasRequestsToolbar = ({onFilterChange, ...props}) => {

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
          View Extras Requests
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={props.onRefresh}
          >
            Refresh
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                label="Filter by Time:"
                name="menuTime"
                onChange={onFilterChange}
                select
                SelectProps={{ native: true }}
                value={props.filter}
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
