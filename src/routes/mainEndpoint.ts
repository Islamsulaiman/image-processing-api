//import express
import express from 'express';

//create endpoint object
const mainEndpoint = express();

//create the 1st endpoint
mainEndpoint.get('/', (req: express.Request, res: express.Response) : void=>{
    res.send("this is the main page from another route!")
    //get the query string from url to be used 
    let data = req.query;
    console.log(data);
})


export default mainEndpoint;