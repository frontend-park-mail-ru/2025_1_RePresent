const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, './src/hbs-precompiled.js');
const LINE_TO_ADD = 'import * as Handlebars from "handlebars/runtime";\n';

function addLineToFile(filePath, line) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Ошибка при чтении файла: ${err.message}`);
            return;
        }

        const newContent = line + data;

        fs.writeFile(filePath, newContent, 'utf8', (err) => {
            if (err) {
                console.error(`Ошибка при записи файла: ${err.message}`);
                return;
            }
        });
    });
}

addLineToFile(FILE_PATH, LINE_TO_ADD);
