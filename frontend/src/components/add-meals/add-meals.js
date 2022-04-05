import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
} from '@mui/material';
import { AddMealsDetails } from './add-meals-details';

export const AddMeals = (props) => {

  const [meals, setMeals] = useState([{mealName: '', mealTime:'Breakfast', mealContent:''}]);

  const onChildChange = (index, field, value) => {
    setMeals([
      ...meals.slice(0,index),
      {
        ...meals[index],
        [field]: value,
      },
      ...meals.slice(index+1),
    ]);
  }

  const onChildDelete = (index) => {
    console.log("Deleting", index);
    setMeals([
      ...meals.slice(0,index),
      ...meals.slice(index+1),
    ]);
  }

  const onAddAnotherMeal = () => {
    setMeals([
      ...meals,
      {mealName: '', mealTime:'Breakfast', mealContent:''},
    ]);
  }

  const onSaveMeals = () => {
    console.log(meals);
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card xs={{gap: 2}}>
        <Grid container spacing={2}>
          {meals.map((meal, index) => 
            <Grid item key={index}>
              <AddMealsDetails
                meal={meal}
                index={index}
                onChange={onChildChange}
                onDelete={onChildDelete}/>
            </Grid>
          )}
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
          gap={3}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onAddAnotherMeal}
          >
            Add another meal
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={onSaveMeals}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
