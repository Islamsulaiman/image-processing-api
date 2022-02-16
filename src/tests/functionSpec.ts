// in this file we are checking  functions in our project

//importing functions
import { server } from "..";

describe("check if functions defined or not", ()=> {
    it('server function from index.ts', ()=>{
        expect(server).toBeDefined();
    })
})

describe("check if functions is called or not", ()=> {
    it("server from index.ts", ()=> {
        expect(server).toHaveBeenCalled();
    })
})