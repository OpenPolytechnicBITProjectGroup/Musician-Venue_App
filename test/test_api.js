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
        var venue = new Venue.Venue("The Grand", 500, "Wellington", ["Pop", "DJ/Electronic"]);
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
            .end((err, res) => {
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
    * Test the GET /api/venues route (list of venues)
    */
describe('GET /api/venues', () => {
    it('Should GET all the venues', (done => {
        chai.request(app)
            .get('/api/venues')
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
describe('POST /api/venues + param', () => {

    it('Should return response OK', (done => {
        // var venue = new Venue.Venue("The Grand", 500, "Wellington", ["Pop", "DJ/Electronic"]);
        chai.request(app)
            .post('/api/venues')
            .type('form')
            .send([{
                "name": "The Grand",
                "capacity": 500,
                "location": "Wellington",
                "genres": ["Pop", "DJ/Electronic"]
            }])
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
describe('GET /api/genres', () => {
    it('Should return an array of genres', (done => {
        chai.request(app)
            .get('/api/genres')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body[0]).to.be.a('string');
                expect(res.body[0]).to.equal('Alternative');
                done();
            });
    }));
});

/**
 * Test the GET /searchByGenres route
 */
describe('GET /api/searchByGenres', () => {
    it('should return status 200', (done => {
        chai.request(app)
            .get('/api/searchByGenres')
            .query({0: 'Pop'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    }));

    it('should return an array', (done => {
        chai.request(app)
            .get('/api/searchByGenres')
            .query({0: 'Pop'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    }))
});