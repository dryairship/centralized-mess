import db from './db.js';

const findExtraItemsWithMessId = (messId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM extra_items WHERE mess_id = ?',
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

export default {
    findExtraItemsWithMessId,
}
