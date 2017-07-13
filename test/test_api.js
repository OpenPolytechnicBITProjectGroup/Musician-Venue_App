//During the test the node envirioment is set to test
process.env.NODE_ENV = 'test';

// import dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index.js');
var _ = require('lodash');

// get whats needed from api
var db = require('../app/db_api/db_api.js');
var Venue = require('../app/db_api/venue.js');

// Add the chai assertions
let should = chai.Should();
let expect = chai.expect;

chai.use(chaiHttp);
// our parent block
describe('Venues', () => {
    beforeEach((done) => { //before each test we can send test data
    var venue = new Venue.Venue("The Grand", 500, "Wellington", ["Cheese", "Slapper"]);    
    db.createVenue(venue);
    });
});

/*
    * Test the GET /other_venues route
    */
    describe('/GET other_venues', () => {
        it('Should GET all the venues', (done => {
            chai.request(app.app)
            .get('/other_venues')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('name');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('The Grand');
                res.body[0].should.have.property('capacity');
                res.body[0].capacity.should.be.a('number');
                res.body[0].capacity.should.equal(500);
                res.body[0].should.have.property('location');
                res.body[0].location.should.be.a('string');
                res.body[0].location.should.equal('Wellington');
                res.body[0].should.have.property('genres');
                res.body[0].genres.should.be.a('array');
                res.body[0].genres.length.should.be.eql(2);
                res.body[0].genres[0].should.equal('Cheese');
                res.body[0].genres[1].should.equal('Slapper');
                
                done();
            });
        }));
    });