
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const server = require('../server');
const {postSearch} = require('../app/routes/record');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("App", () => {
    describe("GET /", () => {
        // Test for connection
        it("should return status 200", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        
    });
});
describe('App', ()=>{
    describe('POST /record', ()=>{
        // Test to get filtered records
        it("Should return records", (done) => {
            chai.request(app)
                .post(`/record`)
                .send({ "startDate": "2016-01-26", "endDate": "2018-02-02", "minCount": 2950, "maxCount": 3000 })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.should.have.property('code');
                    res.body.should.have.property('msg');
                    res.body.should.have.property('records');
                    res.body.records.should.be.a('array');
                    res.body.code.should.equal(0);
                    res.body.records[0].should.have.property('key');
                    res.body.records[0].should.have.property('createdAt');
                    res.body.records[0].should.have.property('totalCount');
                    done();
                })
                .catch(function (err) {
                    throw err;
                 });
        });
        it("Should return 0 records", (done) => {
            chai.request(app)
                .post(`/record`)
                .send({ "startDate": "2019-01-26", "endDate": "2018-02-02", "minCount": 2950, "maxCount": 3000 })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.should.have.property('code');
                    res.body.should.have.property('msg');
                    res.body.should.have.property('records');
                    res.body.code.should.equal(3);
                    res.body.records.should.be.a('array');
                    res.body.records.should.have.length(0);
                    done();
                })
                .catch(function (err) {
                    throw err;
                 });
        });
    })
})