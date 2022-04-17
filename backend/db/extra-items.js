import db from './db.js';

const findExtraItemsWithMessId = (messId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM extra_items
             WHERE mess_id = ? AND deleted = false`,
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

const findExtraItemWithMessAndItemId = (messId, itemId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM extra_items
             WHERE mess_id = ? AND item_id = ? AND deleted = false`,
            [messId, itemId],
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

const insertExtraItem = (messId, itemName, costPerItem) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO extra_items
             (item_name, mess_id, cost_per_item)
             VALUES ?`,
            [[[itemName, messId, costPerItem]]],
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

const deleteExtraItem = (messId, itemId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE extra_items
             SET deleted = true
             WHERE mess_id = ? AND item_id = ?`,
            [messId, itemId],
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
    findExtraItemsWithMessId,
    findExtraItemWithMessAndItemId,
    insertExtraItem,
    deleteExtraItem,
}
