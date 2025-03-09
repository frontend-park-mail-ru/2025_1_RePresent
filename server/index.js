'use strict';

const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

const rootDir = path.join(__dirname, '..');

app.use('/static', express.static(path.join(rootDir, 'static')));

app.get('*', (_, res) => {
    res.sendFile(path.join(rootDir, '/static/index.html'));
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
