import db from "./db.js";

const insertExtrasInMenu = (extrasInMenuData) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO extras_in_menu (menu_id, item_id) VALUES ?',
            [extrasInMenuData],
            (err) => {
                if (err) {
                    console.log(err);
                    resolve (false);
                } else {
                    resolve (true);
                }
            }
        );
    });
}

const findExtrasInMenuByMenuId = (menuId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM extras_in_menu NATURAL JOIN extra_items WHERE menu_id = ?',
            [menuId],
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
    insertExtrasInMenu,
    findExtrasInMenuByMenuId,
};
