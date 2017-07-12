# Musician-Venue_App
Repo for the Musician-Venue WebApp

## Stack

* [Neo4j Bolt JavaScript Driver](https://github.com/neo4j/neo4j-javascript-driver)
* Neo4j
* Frontend: Angular2, bootstrap, [d3.js](http://d3js.org/)
* Server: Nodejs, Express

## Quickstart

### Setup

```bash
$ npm install
```

### Run locally

* Start Neo4j ([Download & Install](http://neo4j.com/download)) locally and open the [Neo4j Browser](http://localhost:7474).
* You will be asked to choose a user name and password, update the password to **'neo4j2'**


```bash
# run in developement mode
$ npm start

```
or
```bash
# also runs in development mode
$ node index.js
```

When running in "dev" mode navigate to [http://localhost:5000](http://localhost:5000) to see the application.


## Development protocol notes

The branch \<dev\> is the current mainline for development, pull from this branch `git fetch` to get the lasest code base, create your branch `git checkout -b <your-branch>` and make your changes.

On completion of your code changes push your branch to the repository, `git push origin <your-branch>` and create pull request for merging.

Siginificant updates to the app can be merged to production, which will auto-deploy to the [heroku hosted app](https://morning-escarpment-88913.herokuapp.com/), this requires a reviewed pull request before merging. The Heroku pipline can create a temporary review app for all open pull requests, but needs to be connected to the grapheneDB if api requests are required for testing.