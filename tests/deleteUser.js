import frisby from "frisby";
import config from "../config.json";

const URL = config.baseUrl + config.getUsersEndpoint;

describe("GET user", function() {

    it('verify existing user is deleted', function(){
       return frisby
            .delete(`${URL}/${11}`)
            .inspectResponse()
            .expect('status', 204)
    });

    it('verify non-existent user', function(){
        return frisby
        .delete(`${URL}/${13333}`)
        .inspectResponse()
            .expect('status', 204);
    });

});