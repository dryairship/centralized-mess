import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';

import config from './config.js';
import routes from './controllers/index.js';

const app = express();
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    secret: config.AUTH_COOKIE_SECRET,
    maxAge: 30 * 24 * 60 * 60 * 1000,
}));

app.use('/api', routes);

app.listen(config.PORT,() => {
    console.log(`Running on PORT ${config.PORT}`);
})
