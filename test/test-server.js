var chai = require('chai');
var chaiHttp = require('chai-http');
const http = require('chai-http/lib/http');
const { deleteOne } = require('../api/models/user');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe("product",function(){
    chai.request(server).get('/product').end((err,res)=>{
        res.should.have.status(200);
        res.should.be.json();
        res.should.
        done();
    });
});