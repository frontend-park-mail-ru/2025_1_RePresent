'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 8000;
const DIST_DIR = path.join(__dirname, '..', 'dist');

const app = express();

app.use('/static', express.static(DIST_DIR));

app.get('/csat', (req, res, next) => {
    const filePath = path.join(DIST_DIR, 'indexCsat.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return next(err);

        const REFERRER_URL = req.get('Referer') ?? req.get('Referrer');

        const modifiedData = data.replace(/REFERRER_URL/g, REFERRER_URL);

        res.set('Content-Type', 'text/html; charset=UTF-8');
        res.send(modifiedData);
    });
});

app.get('*', (_, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Development server started on https://localhost:${PORT}`);
});
