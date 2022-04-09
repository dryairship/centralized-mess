import db from "./db.js";

const insertBill = (timeId, rollNumber, messId, mealDate, mealTime) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO basic_menu_bills (time_id, roll_number, mess_id, meal_date, meal_time) VALUES ?',
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

export default {
    insertBill,
};
