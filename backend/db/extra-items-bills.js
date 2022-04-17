import db from './db.js';

const findExtraItemsRequestWithMessId = (messId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT time_id, roll_number, name, item_id, item_name, quantity, meal_date, meal_time 
             FROM extra_items_bills NATURAL JOIN extra_items NATURAL JOIN students
             WHERE mess_id = ? AND claimed = false
             ORDER BY time_id DESC`,
            [messId],
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
            `SELECT *
             FROM extra_items_bills NATURAL JOIN extra_items NATURAL JOIN messes 
             WHERE roll_number = ? AND claimed = true 
             ORDER BY time_id DESC`,
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
            `SELECT *
             FROM extra_items_bills NATURAL JOIN extra_items 
             WHERE roll_number = ? AND mess_id = ? AND claimed = true
             ORDER BY time_id DESC`,
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
            `SELECT *
             FROM extra_items_bills NATURAL JOIN extra_items
             WHERE roll_number = ? AND mess_id = ? AND claimed = false
             ORDER BY time_id DESC`,
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
            `SELECT *
             FROM extra_items_bills NATURAL JOIN extra_items
             WHERE roll_number = ? AND claimed = false
             ORDER BY time_id DESC`,
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
            `INSERT INTO extra_items_bills 
             (time_id, roll_number, mess_id, meal_date, meal_time, item_id, quantity, claimed, cost)
             VALUES ?`,
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
            `SELECT *
             FROM extra_items_bills
             WHERE time_id = ?`,
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
            `DELETE FROM extra_items_bills
             WHERE time_id = ?`,
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

const findGroupedExtraItemBillsForMessDateAndTime = (messId, mealDate, mealTime) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT item_id, item_name, cost_per_item, sum(quantity) AS quantity, sum(cost) AS cost
             FROM extra_items_bills NATURAL JOIN extra_items
             WHERE mess_id = ? AND meal_date = ? AND meal_time = ? AND claimed = true
             GROUP BY item_id`,
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

const findGroupedExtraItemBillsForMessAndDate = (messId, mealDate) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT item_id, item_name, cost_per_item, sum(quantity) AS quantity, sum(cost) AS cost
             FROM extra_items_bills NATURAL JOIN extra_items
             WHERE mess_id = ? AND meal_date = ? AND claimed = true
             GROUP BY item_id`,
            [messId, mealDate],
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

const markRequestClaimed = (messId, timeId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE extra_items_bills
             SET claimed = true
             WHERE mess_id = ? AND time_id = ?`,
            [messId, timeId],
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

export default {
    findExtraItemsRequestWithMessId,
    findExtraItemsBillsForStudent,
    findExtraItemsBillsForStudentAndMess,
    findUnclaimedExtraItemsForStudentAndMess,
    findUnclaimedExtraItemsForStudent,
    insertExtraItemBill,
    findExtraItemBillByTimeId,
    deleteExtraItemBill,
    findGroupedExtraItemBillsForMessDateAndTime,
    findGroupedExtraItemBillsForMessAndDate,
    markRequestClaimed,
}
