//import express
import express from 'express';

//import sharp for image processing
import sharp from 'sharp';

//import promise object from fs module
import { promises as fs } from 'fs';

//create endpoint object
const mainEndpoint = express();

//fixed path to the images default folder 
const pathToImages = 'assets/full/';

//create interfaces
interface Query{
    filename?: string,
    width?: string,
    height : string
};

//create the 1st endpoint
mainEndpoint.get('/', (req: express.Request, res: express.Response) : void=>{
    res.send("this is the main page from another route!");

    //get the query string from url to be used 
    // let data = req.query;
    let data = req.query;

    //using sharp, resize the image by the query string provided
    (async function(){
        try {
            //get the width and the height from 'data' object
            let width = parseInt(data.width as string)
            let height = parseInt(data.height as string)

            //process the image
            let image = await sharp(`${pathToImages}${data.filename}`).resize(width, height).jpeg().toBuffer();
            fs.writeFile('assets/thumb/test.jpeg', image)
            

        } catch (error) {
            console.log(`Error from async func ${error}`)
        }
    }
    )();
    console.log(`${pathToImages}${data.filename}`)
    console.log(data.filename);
    console.log(typeof(data));
})


export default mainEndpoint;