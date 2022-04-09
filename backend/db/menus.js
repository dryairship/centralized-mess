import db from './db.js';

const findMenusWithMessId = (messId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM menus WHERE mess_id = ?',
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
    findMenusWithMessId,
}
