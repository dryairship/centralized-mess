import db from "./db.js";

const insertBill = (timeId, rollNumber, messId, mealDate, mealTime) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO basic_menu_bills
             (time_id, roll_number, mess_id, meal_date, meal_time)
             VALUES ?`,
            [[[timeId, rollNumber, messId, mealDate, mealTime]]],
            (err) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                } else {
                    resolve (true);
                }
            }
        );
    });
}

const findBasicMenuBillsForStudent = (rollNumber) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM basic_menu_bills NATURAL JOIN messes
             WHERE roll_number = ?
             ORDER BY meal_date DESC, FIELD(meal_time, "Breakfast", "Lunch", "Dinner") DESC`,
            [rollNumber],
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

const findBasicMenuBillsForStudentAndMess = (rollNumber, messId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM basic_menu_bills
             WHERE roll_number = ? AND mess_id = ?
             ORDER BY meal_date DESC, FIELD(meal_time, "Breakfast", "Lunch", "Dinner") DESC`,
            [rollNumber, messId],
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

const countStudentsForMeal = (messId, mealDate, mealTime) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT count(*) AS cnt
             FROM basic_menu_bills
             WHERE mess_id = ? AND meal_date = ? AND meal_time = ?`,
            [messId, mealDate, mealTime],
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

const addAverageMealCost = (messId, mealDate, mealTime, avgCost) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE basic_menu_bills
             SET cost = ?
             WHERE mess_id = ? AND meal_date = ? AND meal_time = ?`,
            [avgCost, messId, mealDate, mealTime],
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

const findRecordsForMeal = (messId, mealDate, mealTime) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM basic_menu_bills
             WHERE mess_id = ? AND meal_date = ? AND meal_time = ?
             ORDER BY time_id DESC`,
            [messId, mealDate, mealTime],
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

export default {
    insertBill,
    findBasicMenuBillsForStudent,
    findBasicMenuBillsForStudentAndMess,
    countStudentsForMeal,
    addAverageMealCost,
    findRecordsForMeal,
};
