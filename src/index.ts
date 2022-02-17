//require express to build a server
import express from 'express';

//import external middleware
import mainEndpoint from './routes/mainEndpoint';

//import path module
const path = require('path');

//create the app object
export const app : express.Application = express();

import {promises as fs} from 'fs';

app.use("/", mainEndpoint)


//port number for server
export const port :number = 3000;

//function for checking the server status
export const server = () : void => {
    console.log(`the server is running on port ${port}`)
} 

//listen to the port defined
app.listen(port, server)














// const express = require('express');
// const fs = require('fs');
// const { promises } = require('fs');
// const app = express();

// const port = 3400;

// const sharp = require('sharp');

// const resize = async (req : Express.Request, res : Express.Response, next: Function) => {
//   await sharp(`./full/${req.query.filename}.jpg`)
//     .resize(parseInt(req.query.width), parseInt(req.query.height))
//     .toFile('output.jpg');
//   next();
// };

// const sendBack = async (req, res, next) => {
//   await fs.readFile('output.jpg', function (err, data) {
//     if (err) throw err; // Fail if the file can't be read.
//     res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//     res.end(data); // Send the file data to the browser.
//   });
//   next();
// };

// app.listen(port, () => {
//   console.log(`server running on port:${port} `);
// });

// app.get('/', (req, res) => {
//   res.send('startiing');
// });

// app.get('/api/images', resize, sendBack, (req, res) => {});

