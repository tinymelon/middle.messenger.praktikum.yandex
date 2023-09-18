import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use("/static", express.static(path.join(__dirname, "/static")));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
