//import express
import express from 'express';

//import writeFile function
import  { writeFile,readFile } from './routes';


import fs from 'fs';

//import ParsedQs type to be added for the query string from the url
import { ParsedQs } from 'qs';

//create an instance of the express router object to creat new route that we will use with the app object
export const mainEndpoint: express.Router = express.Router();

//require path module
import path from 'path';





//create the 1st endpoint
mainEndpoint.get('/', (req: express.Request, res: express.Response): void => {
  //get the query string from url to be used
  const data: ParsedQs = req.query;

  //get the width and the height from 'data' object
  const filename: string = data.filename as string;
  const width: number = parseInt(data.width as string);
  const height: number = parseInt(data.height as string);

  //using path module, determine the path to image files inside assets folder
  const fullFolderPath: string = path.resolve('./assets/full'); //path to full folder
  const pathToFullImage: string = path.join(fullFolderPath, filename); //path to full selected image
  const thumbFolderPath: string = path.resolve('./assets/thumb'); //path to thumb folder
  const pathToThumbImage: string = path.join(
    thumbFolderPath,
    `name-${filename}-width=${width}-height=${height}`
  ); //path to images inside thumb folder

  //add these two calls inside IIFE and make it asynchronous to force readeFile to wait for the promise returned by writeFile, so  the API dos'nt read before it write's.
  (async function () {
    //call the function to process and write new images, and add await before it to make readFile waits for it's return
    await writeFile(
      width,
      height,
      pathToFullImage,
      pathToThumbImage,
      thumbFolderPath,
      filename
    );

    //call the readFile function
    readFile(res, pathToThumbImage);
  })();
});

export default mainEndpoint;
