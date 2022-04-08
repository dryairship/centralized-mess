import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import students from '../data/students.json' assert {type: "json"}; 

export default function insertStudents(connection) {
    const emails = {};
    const rolls = {};
    const rollsWithPasswords = ['180561', '180682'];
    const studentData = students
        .filter((student) => student.u !== '')
        .filter((student) => {
            if(rolls[student.i] || emails[student.u.toLowerCase()] || student.u.length > 18)
                return false;
            rolls[student.i] = true;
            emails[student.u.toLowerCase()] = true;
            return true;
        })
        .map((student) => [
            student.i,
            student.n,
            faker.phone.phoneNumber("+91 ##########"),
            student.r + ", " + student.h,
            student.u + "@iitk.ac.in",   
            rollsWithPasswords.includes(student.i) ? bcrypt.hashSync(student.i, 10) : null,    
        ]);
    const statement = "INSERT INTO students (roll_number, name, phone_number, address, email, password) VALUES ?";
    connection.query(statement, [studentData], (err) => {
        if (err) {
            console.log("Error while inserting students: ", err);
        } else {
            console.log("Students inserted successfully");
        }
    });
}
