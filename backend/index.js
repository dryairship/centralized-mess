import config from './config.js';

import express from 'express';
const app = express();

app.listen(config.PORT,() => {
    console.log(`Running on PORT ${config.PORT}`);
})
