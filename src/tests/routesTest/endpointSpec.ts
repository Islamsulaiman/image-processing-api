// in this file we are checking our endpoints

//import superTest module to test endpoints
import supertest from "supertest";

//import endPoint module to be tested
import mainEndpoint from "../../routes/mainEndpoint";


//create superTest object
const requestMainEndpoint = supertest(mainEndpoint);

//create our suite
describe("testing our mainEndpoint middleware endpoint" , () =>  {
    //create it block with async function as superTest need
    it("testing the server status using superTest", async ()  =>{

        //get the response to the request object with it's route
        const response = await requestMainEndpoint.get('/api');

        // use response object value in the expect block
        expect(response.status).toEqual(200);
    })
})