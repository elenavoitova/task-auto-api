import frisby from "frisby";
import {assert} from "chai";
import config from "../config.json";
import checkDateTime from "../utils/timeHandler";

const Joi = frisby.Joi;
const URL = config.baseUrl + config.getUsersEndpoint;

let userID = []; // if futher DELETE users are needed


describe("CREATE user", function() {


    it('Verify user is created', function(){
        return frisby
            .post(URL, {
              name: 'morpheus',
              job: 'leader'
            })
            .inspectBody()
            .expect('status', 201)
            .expect('json', 'name', 'morpheus')
            .expect('json', 'job', 'leader')
            .expect('jsonTypes', '', {
              'id': Joi.number().required(),
              'name': Joi.string().required(),
              'job': Joi.string().required(),
              'createdAt': Joi.string().isoDate().required()
            })
            .then(function (res) {
              userID.push(JSON.parse(res.body).id);
              assert.isTrue(checkDateTime((JSON.parse(res.body).createdAt)), "Update time isn't correct");
            })      
    });

    it('Verify create with empty body', function(){
      return frisby
          .post(URL, {})
          .expect('status', 201)
          .then(function (res) {
            userID.push(JSON.parse(res.body).id);
            assert.isTrue(checkDateTime((JSON.parse(res.body).createdAt)), "Update time isn't correct");
        })
          
    });

    it('Verify create with undefined parameters', function(){
      return frisby
          .post(URL, {
            name: undefined,
            job: undefined
          })
          .expect('status', 201)
          .then(function (res) {
            userID.push(JSON.parse(res.body).id);
            assert.isTrue(checkDateTime((JSON.parse(res.body).createdAt)), "Update time isn't correct");
        })    
    });

    it('Verify create with empty parameters', function(){
      return frisby
          .post(URL, {
            name: '',
            job: ''
          })
          .expect('status', 201)
          .then(function (res) {
            userID.push(JSON.parse(res.body).id);
            assert.isTrue(checkDateTime((JSON.parse(res.body).createdAt)), "Update time isn't correct");
        })    
    });

});