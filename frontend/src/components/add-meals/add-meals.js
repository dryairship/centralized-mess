import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  Alert,
} from '@mui/material';
import { AddMealsDetails } from './add-meals-details';

export const AddMeals = (props) => {

  const [meals, setMeals] = useState([{mealTime:'Breakfast', mealMenu:{}, mealDates:[]}]);
  const [alertData, setAlertData] = useState({severity: 'error', message: 'Meow', visible: false});

  const onChildChange = (index, field, value) => {
    console.log(index, field);
    console.log(value);
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
      {mealTime:'Breakfast', mealMenu:{}, mealDates: []},
    ]);
  }

  const dateToSQLString = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  const onSaveMeals = async () => {
    const mealsData = meals.map((meal) => { return {
      menuId: meal.mealMenu.menu_id,
      time: meal.mealTime,
      dates: meal.mealDates.map(dateToSQLString),
    };});
    const response = await fetch('/api/manager/addMeals', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mealsData),
    });
    const data = await response.json();
    setAlertData({
      severity: response.status == 200 ? 'success' : 'error',
      message: data.message,
      visible: true,
    });
    if(response.status == 200) {
      setMeals([]);
    }
  }

  return (
    <>
    {alertData.visible && 
      <Alert sx={{marginBottom: 2}} severity={alertData.severity} variant="filled">{alertData.message}</Alert>
    }
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
                onDelete={onChildDelete}
                availableMenus={props.availableMenus}
              />
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
    </>
  );
};
