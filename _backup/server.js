const http = require ("http");
const app = require ("./app");
// const express = require('express');
// const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 3030; // export PORT=8080



server.listen(port, () => console.log(`listening on http://localhost:${port}`));
