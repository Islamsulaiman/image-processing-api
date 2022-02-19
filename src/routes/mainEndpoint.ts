//import express
import express from 'express';

//import sharp for image processing
import sharp from 'sharp';

//import promise object from fs module
// import { promises as fs } from 'fs';
import  fs  from 'fs';


//import ParsedQs type to be added for the query string from the url 
import { ParsedQs } from 'qs';

//create an instance of the express router object to creat new route that we will use with the app object
export const mainEndpoint: express.Router = express.Router();

//require path module
import path from 'path';

//using sharp with IIEF, resize the image by the query string provided
export const writeFile = async (width: number, height: number, pathToFullImage: string, pathToThumbImage: string, thumbFolderPath: string, filename: string): Promise<void> => {
    try {

        //test is the potential name of the processed image saved at the thumb folder if it was processed.
        let test = `name-${filename}-width=${width}-height=${height}.jpeg`;

        //thumbFolderContent is the content inside thumb folder, which is the previously processed images.
        let thumbFolderContent : string[]  = [];

        // this read all the previously processed images inside thumb folder
        fs.readdirSync(thumbFolderPath).forEach((file: string) => {
            // append item to thumbFolderContent array
            thumbFolderContent.push(file);
        });

        //indexOf array method returns -1 if the argument is not inside the caller array, and buy comparing with (!== -1 )we are saying that if it's in . 
        // this if statement will  decide if the image is already processed then do nothing, if new image process new.
        if(thumbFolderContent.indexOf(test) === -1){

            //process the image
            let image = await sharp(`${pathToFullImage}.jpeg`).resize(width, height).jpeg().toBuffer();

            // write the processed image to the target folder using writeFile method from within promises object inside fs module
            fs.promises.writeFile(`${pathToThumbImage}.jpeg`, image);
        };
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
mainEndpoint.get('/', (req: express.Request, res: express.Response) : void=>{

    //get the query string from url to be used 
    const data: ParsedQs = req.query;

    //get the width and the height from 'data' object
    let filename : string = data.filename as string;
    let width: number = parseInt(data.width as string);
    let height: number = parseInt(data.height as string);

    //using path module, determine the path to image files inside assets folder
    const fullFolderPath : string =  path.resolve('./assets/full');                                                         //path to full folder
    const pathToFullImage : string = path.join(fullFolderPath, filename)                                                    //path to full selected image
    const thumbFolderPath : string = path.resolve('./assets/thumb');                                                        //path to thumb folder
    const pathToThumbImage : string = path.join(thumbFolderPath, `name-${filename}-width=${width}-height=${height}`)        //path to images inside thumb folder 

    //call the function to process and write new images 
    writeFile(width, height, pathToFullImage, pathToThumbImage, thumbFolderPath, filename);

    //call the readFile function 
    // If we didn't use setTimeout, the endpoint will try to read before the file is even written, so to solve this problem, use setTimeOut to make the reading process lag after the writing in the event loop. 
    setTimeout(()=>readFile(res, pathToThumbImage), 100);

});

export default mainEndpoint;
