// this file will contain the functions used by mainEndpoint

//import fs module to navigate file system
import fs from 'fs'

//import sharp for image processing
import sharp from 'sharp';

//import express module
import express from 'express';



//using sharp with IIEF, resize the image by the query string provided
export const writeFile = async (
  width: number,
  height: number,
  pathToFullImage: string,
  pathToThumbImage: string,
  thumbFolderPath: string,
  filename: string
): Promise<void> => {
  try {
    //test is the potential name of the processed image saved at the thumb folder if it was processed.
    const test = `name-${filename}-width=${width}-height=${height}.jpeg`;

    //thumbFolderContent is the content inside thumb folder, which is the previously processed images.
    const thumbFolderContent: string[] = [];

    // this read all the previously processed images inside thumb folder
    fs.readdirSync(thumbFolderPath).forEach((file: string) => {
      // append item to thumbFolderContent array
      thumbFolderContent.push(file);
    });

    //indexOf array method returns -1 if the argument is not inside the caller array, and buy comparing with (!== -1 )we are saying that if it's in .
    // this if statement will  decide if the image is already processed then do nothing, if new image process new.
    if (thumbFolderContent.indexOf(test) === -1) {
      //process the image
      const image = await sharp(`${pathToFullImage}.jpeg`)
        .resize(width, height)
        .jpeg()
        .toBuffer();

      // write the processed image to the target folder using writeFile method from within promises object inside fs module
      console.log('writing a new image');
      //add await to the return of this promise, so
      return await fs.promises.writeFile(`${pathToThumbImage}.jpeg`, image);
    }
    else if(thumbFolderContent.indexOf(test) != -1){
        console.log('This image is already written.')
    }
  } catch (error) {
    console.log(`Error from async func in writeFile  ${error}`);
  }
};



export const readFile = (res: express.Response, pathToThumbImage: string) => {
  try {
    res.sendFile(`${pathToThumbImage}.jpeg`);
  } catch (error) {
    console.log(`Error from async func in readFile ${error}`);
  }
};



export default writeFile;