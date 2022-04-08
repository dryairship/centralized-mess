import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const AUTH_COOKIE_SECRET = process.env.AUTH_COOKIE_SECRET || Math.random().toString();

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_USER = process.env.MYSQL_USER || 'soppos';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'possop';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'centralized_mess';

export default {
    PORT,
    AUTH_COOKIE_SECRET,

    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
};
