import db from './db.js';

const findExtraItemsRequestWithMessId = (messId, date) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT time_id, roll_number, name, item_id, item_name, quantity, meal_date, meal_time FROM extra_items_bills NATURAL JOIN extra_items NATURAL JOIN students WHERE mess_id = ? and meal_date = ?',
            [messId, date],
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

const findExtraItemsBillsForStudent = (rollNumber) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM extra_items_bills NATURAL JOIN extra_items NATURAL JOIN messes WHERE roll_number = ? AND claimed = true',
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

const findExtraItemsBillsForStudentAndMess = (rollNumber, messId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM extra_items_bills NATURAL JOIN extra_items WHERE roll_number = ? AND mess_id = ? AND claimed = true',
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

export default {
    findExtraItemsRequestWithMessId,
    findExtraItemsBillsForStudent,
    findExtraItemsBillsForStudentAndMess,
}
