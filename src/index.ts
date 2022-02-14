//require express to build a server
import express from 'express';

//create the app object
const app = express();


//create the 1st endpoint
app.get('/', (req: express.Request, res: express.Response) : void=>{
    res.send("this is the main page!")
    let data = req.query;
    console.log(data);
})


//port number for server
const port :number = 3000;

app.listen(port, ():void => {
    console.log(`the server is running on port ${port}`)
})