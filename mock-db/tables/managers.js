import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';

export default function insertManagers(connection) {
    const managerData = [];

    for(let i = 1; i <= 13; i++) {
        for(let j = 1; j <= 2; j++) {
            let firstName = faker.name.firstName();
            let lastName = faker.name.firstName();
            let pf = (4000 + (10*i) + j).toString();
            managerData.push([
                pf,
                firstName + " " + lastName,
                faker.phone.phoneNumber("+91 ##########"),
                i,
                faker.internet.email(firstName, lastName, "iitk.ac.in"),
                bcrypt.hashSync(pf, 10),
            ]);
        }
    }

    const statement = "INSERT INTO managers (pf_number, name, phone_number, mess_id, email, password) VALUES ?";
    connection.query(statement, [managerData], (err) => {
        if (err) {
            console.log("Error while inserting managers: ", err);
        } else {
            console.log("Managers inserted successfully");
        }
    });
}
