import http from 'http';
import express from 'express';
import router from './router';

const app = express()
const server = http.createServer(app);

const PORT = 4000;
const HOST = '0.0.0.0';

app.use(express.static('uploads'));
app.use(router);

server.listen(PORT, HOST, () => {
    console.log(`Server listening on port ${PORT}`)
})
