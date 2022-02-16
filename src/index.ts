//require express to build a server
import express from 'express';

//import external middleware
import mainEndpoint from './routes/mainEndpoint';


//create the app object
export const app = express();


app.use("/", mainEndpoint)


//port number for server
export const port :number = 3000;

app.listen(port, ():void => {
    console.log(`the server is running on port ${port}`)
})