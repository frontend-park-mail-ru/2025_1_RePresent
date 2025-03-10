'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT;
const API_ORIGIN = process.env.API_ORIGIN;
const API_VERSION = process.env.API_VERSION;

const rootDir = path.join(__dirname, '..');

// Middleware для статических файлов с обработкой api.js
app.use('/static', (req, res, next) => {
    // Проверяем, запрашивается ли файл api.js
    if (req.url.endsWith('/api.js')) {
        const filePath = path.join(rootDir, 'static', req.url); // Полный путь к файлу

        // Читаем и изменяем содержимое файла
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return next(err); // Передаем ошибку дальше, если файл не найден

            // Заменяем ENV_API_ORIGIN на значение host
            const modifiedData = data.replace(/ENV_API_ORIGIN/g, API_ORIGIN).replace(/ENV_API_VERSION/g, API_VERSION);

            // Отправляем измененное содержимое клиенту
            res.set('Content-Type', 'application/javascript');
            res.send(modifiedData);
        });
    } else {
        // Если запрашивается не api.js, передаем управление express.static
        express.static(path.join(rootDir, 'static'))(req, res, next);
    }
});

app.get('*', (_, res) => {
    res.sendFile(path.join(rootDir, '/static/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
