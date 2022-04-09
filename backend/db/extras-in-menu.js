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

export default {
    insertExtrasInMenu,
};
