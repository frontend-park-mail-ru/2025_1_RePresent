'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });
const app = express();

const PORT = process.env.PORT;
const API_ORIGIN = process.env.API_ORIGIN;
const API_VERSION = process.env.API_VERSION;

const rootDir = path.join(__dirname, '..');

// Middleware для статических файлов с обработкой bundle.js
app.use('/static', (req, res, next) => {
    // Проверяем, запрашивается ли файл bundle.js
    if (req.url.endsWith('.js')) {
        const filePath = path.join(rootDir, 'dist', req.url); // Полный путь к файлу

        // Читаем и изменяем содержимое файла
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return next(err); // Передаем ошибку дальше, если файл не найден

            // Заменяем вставки на константы из .env
            const modifiedData = data.replace(/ENV_API_ORIGIN/g, API_ORIGIN).replace(/ENV_API_VERSION/g, API_VERSION);

            // Отправляем измененное содержимое клиенту
            res.set('Content-Type', 'application/javascript');
            res.send(modifiedData);
        });
    } else {
        // Если запрашивается не api.js, передаем управление express.static
        express.static(path.join(rootDir, 'dist'))(req, res, next);
    }
});

app.get('/csat', (req, res, next) => {
    const filePath = path.join(rootDir, 'dist', 'indexCsat.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return next(err);

        const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

        const modifiedData = data.replace(/REFERRER_URL/g, url);

        res.set('Content-Type', 'text/html; charset=UTF-8');
        res.send(modifiedData);
    });
});

app.get('*', (_, res) => {
    res.sendFile(path.join(rootDir, '/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
