//import express
import express from 'express';

//import sharp for image processing
import sharp from 'sharp';

//import promise object from fs module
import { promises as fs } from 'fs';

//create endpoint object
export const mainEndpoint = express();

//require path module
const path = require('path');


//create interfaces
interface Query{
    filename: string,
    width: string,
    height : string
};


//create the 1st endpoint
mainEndpoint.get('/', (req: express.Request, res: express.Response) : void=>{
    // res.send("this is the main page from another route!");

    //get the query string from url to be used 
    const data = req.query;

    console.log(data)

    //using path module, determine the path to image files inside assets folder
    const fullFolderPath : string =  path.resolve('full');                          //path to full folder
    const pathToFullImage : string = path.join(fullFolderPath, data.filename)       //path to full selected image
    const correctPathToFullImage : string = path.normalize(pathToFullImage)
    const thumbFolderPath : string = path.resolve('thumb');                         //path to thumb folder
    const pathToThumbImage = path.join(thumbFolderPath, data.filename)              //path to images inside thumb folder 


    //using sharp with IIEF, resize the image by the query string provided
    const writeFile = async(): Promise<void> =>{
        try {
            //get the width and the height from 'data' object
            let width: number = parseInt(data.width as string)
            let height: number = parseInt(data.height as string)

            console.log('inside async')

            //process the image
            let image = await sharp(`C:/Users/maesl/Desktop/imageProcessingApi/assets/full/image.jpeg`).resize(width, height).jpeg().toBuffer();
            fs.writeFile(`C:/Users/maesl/Desktop/imageProcessingApi/assets/thumb/image.jpeg`, image);
            

        } catch (error) {
            console.log(`Error from async func ${error}`)
        }
    }
    //call the function
    writeFile();

    const readFile = async() =>{
        try {
            const image = await fs.readFile(`C:/Users/maesl/Desktop/imageProcessingApi/assets/thumb/image.jpeg`);
            console.log(image);
            res.sendFile(`C:/Users/maesl/Desktop/imageProcessingApi/assets/thumb/image.jpeg`);

        } catch (error) {
            console.log(`Error from async func ${error}`)
        }
    }
    readFile();

    
            //added code
            console.log(fullFolderPath);
            console.log(pathToFullImage);
            console.log(correctPathToFullImage);
            console.log(thumbFolderPath);
            console.log(pathToThumbImage);
})


export default mainEndpoint;