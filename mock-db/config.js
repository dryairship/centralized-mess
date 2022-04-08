import dotenv from 'dotenv';
dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_USER = process.env.MYSQL_USER || 'soppos';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'possop';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'centralized_mess';


export default {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
};
