import db from './db.js';

const findUpcomingMealsWithMessId = (messId, startDate) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM meals NATURAL JOIN menus
             WHERE mess_id = ? AND meal_date >= ?
             ORDER BY meal_date ASC, FIELD(meal_time, "Breakfast", "Lunch", "Dinner") ASC`,
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

const findAllUpcomingMeals = (date, time) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM meals NATURAL JOIN menus
             WHERE meal_date = ? AND meal_time = ?`,
            [date, time],
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

const findMealByMessDateTime = (messId, date, time) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM meals NATURAL JOIN menus
             WHERE mess_id = ? AND meal_date = ? AND meal_time = ?`,
            [messId, date, time],
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
            `INSERT INTO meals
             (meal_date, mess_id, menu_id, meal_time)
             VALUES ?`,
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

const findCompletedMealsWithMessId = (messId, endDate) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM meals NATURAL JOIN menus
             WHERE mess_id = ? AND meal_date <= ?
             ORDER BY meal_date DESC, FIELD(meal_time, "Breakfast", "Lunch", "Dinner") DESC`,
            [messId, endDate],
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

const addTotalMealCost = (messId, mealDate, mealTime, totalCost) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE meals
             SET total_cost = ?
             WHERE mess_id = ? AND meal_date = ? AND meal_time = ?`,
            [totalCost, messId, mealDate, mealTime],
            (err, result) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        );
    });
}

export default {
    findUpcomingMealsWithMessId,
    findAllUpcomingMeals,
    insertMeals,
    findMealByMessDateTime,
    findCompletedMealsWithMessId,
    addTotalMealCost,
};
