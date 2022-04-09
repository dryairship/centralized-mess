import db from './db.js';

const findUpcomingMealsWithMessId = (messId, startDate) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM meals natural join menus WHERE mess_id = ? and meal_date > ?',
            [messId, startDate],
            (err, result) => {
                if (err) {
                    console.log(err);
                    resolve([]);
                } else {
                    resolve (result);
                }
            }
        );
    });
}

const insertMeals = (mealsData) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO meals (meal_date, mess_id, menu_id, meal_time) VALUES ?',
            [mealsData],
            (err, result) => {
                if (err) {
                    console.log(err);
                    resolve (false);
                } else {
                    resolve (true);
                }
            }
        );
    });
}

export default {
    findUpcomingMealsWithMessId,
    insertMeals,
};
