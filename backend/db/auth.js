import db from './db.js';

const findManagerWithPFNumber = (pfNumber) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM managers WHERE pf_number = ?',
            [pfNumber],
            (err, result) => {
                if (err) reject (err);
                else resolve (result);
            }
        );
    });
}

export default {
    findManagerWithPFNumber,
}
