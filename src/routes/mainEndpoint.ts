//import express
import express from 'express';

//import sharp for image processing
import sharp from 'sharp';

//import promise object from fs module
import { promises as fs } from 'fs';

//import ParsedQs type to be added for the query string from the url 
import { ParsedQs } from 'qs';

//create endpoint object
export const mainEndpoint: express.Application = express();

//require path module
const path = require('path');

//using sharp with IIEF, resize the image by the query string provided
export const writeFile = async (filename: string, width: number, height: number): Promise<void> => {

    try {
        //process the image
        let image = await sharp(`assets/full/image.jpeg`).resize(width, height).jpeg().toBuffer();
        fs.writeFile(`assets/thumb/name-${filename}-width=${width}-height=${height}.jpeg`, image);
        
    } catch (error) {
        console.log(`Error from async func in writeFile  ${error}`)
    }
};

export const readFile = async (filename: string, width: number, height: number, res: express.Response) =>{
    try {
        const image = await fs.readFile(`assets/thumb/image.jpeg`);
        res.sendFile(`C:/Users/maesl/Desktop/imageProcessingApi/assets/thumb/name-${filename}-width=${width}-height=${height}.jpeg`);

    } catch (error) {
        console.log(`Error from async func in readFile ${error}`)
    }
}


//create the 1st endpoint
mainEndpoint.get('/', (req: express.Request, res: express.Response) : void=>{
    // res.send("this is the main page from another route!");

    //get the query string from url to be used 
    const data: ParsedQs = req.query;

    // //get the width and the height from 'data' object
    // let width: number = parseInt(data.width as string)
    // let height: number = parseInt(data.height as string)


    //get the width and the height from 'data' object
    let filename : string = data.filename as string;
    let width: number = parseInt(data.width as string)
    let height: number = parseInt(data.height as string)

    console.log(data)

    // //using path module, determine the path to image files inside assets folder
    // const fullFolderPath : string =  path.resolve('notFull');                          //path to full folder
    // const pathToFullImage : string = path.join(fullFolderPath, data.filename)       //path to full selected image
    // const correctPathToFullImage : string = path.normalize(pathToFullImage)
    // const thumbFolderPath : string = path.resolve('thumb');                         //path to thumb folder
    // const pathToThumbImage = path.join(thumbFolderPath, data.filename)              //path to images inside thumb folder 

    //call the function
    writeFile(filename, width, height);

    //call the readFile function 
    readFile(filename, width, height, res);

    
    // //added code
    // console.log(fullFolderPath);
    // console.log(pathToFullImage);
    // console.log(correctPathToFullImage);
    // console.log(thumbFolderPath);
    // console.log(pathToThumbImage);
})


export default mainEndpoint;