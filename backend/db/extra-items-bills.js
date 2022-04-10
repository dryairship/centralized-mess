import db from './db.js';

const findExtraItemsRequestWithMessId = (messId, date) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT time_id, roll_number, name, item_id, item_name, quantity, meal_date, meal_time FROM extra_items_bills natural join extra_items natural join students WHERE mess_id = ? and meal_date = ?',
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

export default {
    findExtraItemsRequestWithMessId,
}
