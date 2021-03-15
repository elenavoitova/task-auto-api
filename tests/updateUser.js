import frisby from "frisby";
import {assert} from "chai";
import config from "../config.json";
import checkDateTime from "../utils/timeHandler";

const Joi = frisby.Joi;
const URL = config.baseUrl + config.getUsersEndpoint;


describe("UPDATE user", function() {


    it('Verify user is updates', async function(){
        return frisby
            .patch(`${URL}/${12}`, {
              name: 'testName',
              job: 'testJob'
            })
            .expect('status', 200)
            .expect('json', 'name', 'testName')
            .expect('json', 'job', 'testJob')
            .expect('jsonTypes', '', {
              'name': Joi.string().required(),
              'job': Joi.string().required(),
              'createdAt': Joi.string().isoDate()
            }).then(function (res) {
              assert.isTrue(checkDateTime((JSON.parse(res.body).updatedAt)), "Update time isn't correct");
            });
    });

    it('Verify update with empty body', function(){
      return frisby
          .patch(`${URL}/${12}`, {})
          .expect('status', 200)
          .then(function (res) {
            assert.isTrue(checkDateTime((JSON.parse(res.body).updatedAt)), "Update time isn't correct");
          });
          
    });

    it('Verify update with undefined parameters', function(){
      return frisby
          .post(`${URL}/${12}`, {
            name: undefined,
            job: undefined
          })
          .expect('status', 201);
    });

    it('Verify update with empty parameters', function(){
      return frisby
          .post(`${URL}/${12}`, {
            name: '',
            job: ''
          })
          .expect('status', 201)
    });

});