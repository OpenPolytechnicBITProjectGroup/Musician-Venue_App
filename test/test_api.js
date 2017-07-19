//During the test the node envirioment is set to test
process.env.NODE_ENV = 'test';

// import dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index.js').app;
var _ = require('lodash');

// get whats needed from api
var db = require('../server/db_api/db_api.js');
var Venue = require('../server/db_api/venue.js');


// Add the chai assertions
var should = chai.Should();
var expect = chai.expect;

chai.use(chaiHttp);
// our parent block
describe('Venues', () => {
    beforeEach((done) => { //before each test we can send test data
    var venue = new Venue.Venue("The Grand", 500, "Wellington", ["Cheese", "Slapper"]);    
    db.createVenue(venue);
    });
});

/*
    * Test the /GET route
    */
    describe('GET /', () => {
        it('Should respond with a status 200', (done => {
            chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        }));
        it('Should be a html file', (done => {
            chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.be.html;
                done();
            })
        }))
    });

/*
    * Tests the GET /members route
    */
    describe('GET /members', () => {
        it('Should return Response 200', (done => {
            chai.request(app)
            .get('/members')
            .end((err,res) => {
                res.should.have.status(200);
                done();
            });
        }));
        it('Should be a html file', (done => {
            chai.request(app)
            .get('/members')
            .end((err, res) => {
                expect(res).to.be.html;
                done();
            });
        }));
    });

/*
    * Test the GET /artists route
    */
    describe('GET /artists', () => {
        it('Should return status 200', (done => {
            chai.request(app)
            .get('/artists')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        }));
        it('Should be a html file', (done => {
            chai.request(app)
            .get('/artists')
            .end((err, res) => {
                expect(res).to.be.html;
                done();
            });
        }));
    });

/*
    * Test the GET /venues route
    */
    describe('GET /venues', () => {
        it('Should return status 200', (done => {
            chai.request(app)
            .get('/venues')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        }));
        it('Should be a html file', (done => {
            chai.request(app)
            .get('/venues')
            .end((err, res) => {
                expect(res).to.be.html;
                done();
            });
        }));
    });

/*
    * Test the GET /other_venues route
    */
    describe('GET /other_venues', () => {
        it('Should GET all the venues', (done => {
            chai.request(app)
            .get('/other_venues')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                
                done();
            });
        }));
    });

/*
    * Test the GET /send_venue + parameter venue 
    */
    describe('GET /send_venue + param', () => {
        
        it('Should return response OK', (done => {
            var venue = new Venue.Venue("The Grand", 500, "Wellington", ["Cheese", "Slapper"]);
            chai.request(app)
                .get('/send_venue').query({venue})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal('OK');
                    done();
                }); 
        }));
    });    

/*
 * Test GET /genres
 */
    describe('GET /genre', () => {
        it('Should return an array of genres', (done => {
            chai.request(app)
                .get('/genres')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body[0]).to.be.a('string');
                    expect(res.body[0]).to.equal('Alternative');
                    done();
                });
        }));
    });