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
import path from 'path';

//using sharp with IIEF, resize the image by the query string provided
export const writeFile = async (width: number, height: number, pathToFullImage: string, pathToThumbImage: string): Promise<void> => {
    try {
    //process the image
        let image = await sharp(`${pathToFullImage}.jpeg`).resize(width, height).jpeg().toBuffer();

    // write the processed image to the target folder
        fs.writeFile(`${pathToThumbImage}.jpeg`, image);
        
    } catch (error) {
        console.log(`Error from async func in writeFile  ${error}`)
    }
};

export const readFile = (res: express.Response, pathToThumbImage: string) =>{
    try {
        res.sendFile(`${pathToThumbImage}.jpeg`);
    } catch (error) {
        console.log(`Error from async func in readFile ${error}`)
    }
}

//create the 1st endpoint
mainEndpoint.get('/api', (req: express.Request, res: express.Response) : void=>{
    // res.write("API route");

    //get the query string from url to be used 
    const data: ParsedQs = req.query;

    //get the width and the height from 'data' object
    let filename = data.filename as string;
    let width: number = parseInt(data.width as string);
    let height: number = parseInt(data.height as string);

    //using path module, determine the path to image files inside assets folder
    const fullFolderPath : string =  path.resolve('./assets/full');                                             //path to full folder
    const pathToFullImage : string = path.join(fullFolderPath, filename)                                        //path to full selected image
    const thumbFolderPath : string = path.resolve('./assets/thumb');                                            //path to thumb folder
    const pathToThumbImage = path.join(thumbFolderPath, `name-${filename}-width=${width}-height=${height}`)     //path to images inside thumb folder 

    //call the function
    writeFile(width, height, pathToFullImage, pathToThumbImage);

    //call the readFile function 
    // If we didn't use setTimeout, the endpoint will try to read before the file is even written, so to solve this problem, use setTimeOut to make the reading process lag after the writing in the event loop. 
    setTimeout(()=>readFile(res, pathToThumbImage), 100);

    console.log(data);          //delete this line
    
    // res.end(); 
})




export default mainEndpoint;




    // //using path module, determine the path to image files inside assets folder
    // const fullFolderPath : string =  path.resolve('./assets/full/');                          //path to full folder
    // const pathToFullImage : string = path.join(fullFolderPath, filename, '.jpeg')       //path to full selected image
    // const correctPathToFullImage : string = path.normalize(pathToFullImage)
    // const thumbFolderPath : string = path.resolve('thumb');                         //path to thumb folder
    // const pathToThumbImage = path.join(thumbFolderPath, filename)              //path to images inside thumb folder 


    // //added code
    // console.log(fullFolderPath);
    // console.log(pathToFullImage);
    // console.log(correctPathToFullImage);
    // console.log(thumbFolderPath);
    // console.log(pathToThumbImage);






