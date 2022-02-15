//import superTest module to test endpoints
import supertest from "supertest";

//import express
import express from "express";

//import endPoint module to be tested
import mainEndpoint from "../../routes/mainEndpoint";


//create superTest object
const request = supertest(mainEndpoint);

//create our suite
describe("testing our mainEndpoint middleware endpoint" , () =>  {
    //create it block with async function as superTest need
    it("testing the server status using superTest", async ()  =>{

        //get the response to the request object with it's route
        const response = await request.get('/');

        // use response object value in the expect block
        expect(response.status).toBe(200);

        //invoke done function for superTest
        // done();
    })
})

