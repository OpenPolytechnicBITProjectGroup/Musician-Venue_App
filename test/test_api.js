//During the test the node envirioment is set to test
process.env.NODE_ENV = 'test';

// import dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index.js').app;
let _ = require('lodash');

// get whats needed from api
let db = require('../server/db_api/Database.js');
let VenueModel = require('../server/db_api/VenueModel');
let GenreModel = require('../server/db_api/GenreModel');


// Add the chai assertions
let should = chai.Should();
let expect = chai.expect;

chai.use(chaiHttp);
// our parent block
describe('Venues', () => {
    beforeEach((done) => { //before each test we can send test data
        let venue = new VenueModel.Venue("The Grand", 500, "Wellington", ["Pop", "DJ/Electronic"]);
        VenueModel.create(venue);
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
    * Test getting a list of venues
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
    * Test posting venues
    */
describe('POST /api/venues', () => {

    it('Should return response 201 CREATED', (done => {
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
                res.should.have.status(201);
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
 * Test the GET /search route
 */
describe('GET /api/search', () => {
    it('Search by genre should return status 200 and an array', (done => {
        chai.request(app)
            .get('/api/search')
            .query({type: 'venue', genre: 'Pop'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    }));

    it('should return status 501 if no parameter is sent', (done => {
        chai.request(app)
            .get('/api/search')
            .end((err, res) => {
                res.should.have.status(501);
                done()
            });
    }));

    it('Search by location should return status 200 and an array', (done => {
        chai.request(app)
            .get('/api/search')
            .query({location: 'Wellington', type: 'venue'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    }));
});

/*
    * Test getting a list of artists
    */
describe('GET /api/artists', () => {
    it('Should GET all the artists', (done => {
        chai.request(app)
            .get('/api/artists')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    }));
});

/*
    * Test posting artist
    */
describe('POST /api/artists', () => {

    it('Should return response 201 CREATED', (done => {
        chai.request(app)
            .post('/api/artists')
            .type('form')
            .send([{
                "name" : "Test Artist",
                "location" : "Timaru",
                "bio": "A test artist from timaru",
                "rating" : "4.2",
                "genres" : ["World", "Classical"]
            }])
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    }));
});