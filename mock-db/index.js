import mysql from 'mysql';
import config from './config.js';
import tables from './tables/index.js';

const connection = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
});

const insertData = () => {
    //tables.insertStudents(connection);
    tables.insertMesses(connection);
    tables.insertManagers(connection);
    tables.insertMenus(connection);
    const extraItems = tables.insertExtraItems(connection);
    const extrasInMenu = tables.insertExtrasInMenu(connection);
    tables.insertMeals(connection);
    tables.insertBills(connection, extrasInMenu, extraItems);
    connection.end();
}

connection.connect(insertData);
