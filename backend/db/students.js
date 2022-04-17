import db from './db.js';

const findStudentWithRollNumber = (rollNumber) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM students
             WHERE roll_number = ?`,
            [rollNumber],
            (err, result) => {
                if (err) reject (err);
                else resolve (result);
            }
        );
    });
}

export default {
    findStudentWithRollNumber,
}
