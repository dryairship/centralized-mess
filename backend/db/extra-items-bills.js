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

const findUnclaimedExtraItemsForStudentAndMess = (rollNumber, messId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM extra_items_bills NATURAL JOIN extra_items WHERE roll_number = ? AND mess_id = ? AND claimed = false',
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

const findUnclaimedExtraItemsForStudent = (rollNumber) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM extra_items_bills NATURAL JOIN extra_items WHERE roll_number = ? AND claimed = false',
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

const insertExtraItemBill = (timeId, rollNumber, messId, mealDate, mealTime, itemId, quantity, claimed, cost) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO extra_items_bills (time_id, roll_number, mess_id, meal_date, meal_time, item_id, quantity, claimed, cost) VALUES ?',
            [[[timeId, rollNumber, messId, mealDate, mealTime, itemId, quantity, claimed, cost]]],
            (err) => {
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

const findExtraItemBillByTimeId = (timeId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM extra_items_bills WHERE time_id = ?',
            [timeId],
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

const deleteExtraItemBill = (timeId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM extra_items_bills WHERE time_id = ?',
            [timeId],
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
    findExtraItemsRequestWithMessId,
    findExtraItemsBillsForStudent,
    findExtraItemsBillsForStudentAndMess,
    findUnclaimedExtraItemsForStudentAndMess,
    findUnclaimedExtraItemsForStudent,
    insertExtraItemBill,
    findExtraItemBillByTimeId,
    deleteExtraItemBill,
}
