import frisby from "frisby";
import config from "../config.json";

const Joi = frisby.Joi;
const URL = config.baseUrl + config.getUsersEndpoint;

describe("GET user", function() {

    it('verify existing user', function(){
       return frisby
            .get(`${URL}/${12}`)
            .expect('status', 200)
            .expect('json', 'data.id', 12)
            .expect('jsonTypes', 'data', {
                'id': Joi.number().required(),
                'email': Joi.string().email().required(),
                'first_name': Joi.string().required(),
                'last_name': Joi.string().required(),
                'avatar': Joi.string().uri().required()
            });
    });

    it('verify non-existent user', function(){
        return frisby
        .get(`${URL}/${13333}`)
            .expect('status', 404);
    });

});