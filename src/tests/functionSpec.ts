// in this file we are checking  functions in our project

//importing functions
import { server } from "..";                                        //from index.ts
// import { writeFile, readFile } from "../routes/mainEndpoint";       //from mainEndpoint

describe("check if functions defined or not", ()=> {
    it('server function from index.ts', ()=>{
        expect(server).toBeDefined();
    })
    // it('writeFile function from mainEndpoint.ts', ()=>{
    //     expect(writeFile).toBeDefined();
    // })
    // it('readFile function from mainEndpoint.ts', ()=>{
    //     expect(readFile).toBeDefined();
    // })    

})

