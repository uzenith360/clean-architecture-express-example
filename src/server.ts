import express from 'express'; 

const server = express(); 

server.use(express.json()); // Middleware to parse JSON bodies
server.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

export default server;
