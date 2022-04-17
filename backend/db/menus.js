import db from './db.js';

const findMenusWithMessId = (messId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM menus
             WHERE mess_id = ? and deleted = false`,
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

const insertMenus = (menusData) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO menus
             (menu_name, mess_id, menu_time, contents)
             VALUES ?`,
            [menusData],
            (err, result) => {
                if (err) {
                    console.log(err);
                    resolve (-1);
                } else {
                    resolve (result.insertId);
                }
            }
        );
    });
}

export default {
    findMenusWithMessId,
    insertMenus,
}
