# Musician-Venue_App
Repo for the Musician-Venue WebApp

## Stack

* [Neo4j Bolt JavaScript Driver](https://github.com/neo4j/neo4j-javascript-driver)
* Neo4j
* Frontend: Angular2, bootstrap, [d3.js](http://d3js.org/)
* Server: Nodejs, Express, uses ES6 language (make sure your IDE supports ES6)

## Quickstart

### Setup

```bash
$ npm install -i
```

### Run locally

* Start Neo4j ([Download & Install](http://neo4j.com/download)) locally and open the [Neo4j Browser](http://localhost:7474).
* You will be asked to choose a user name and password, update the password to **'neo4j2'**

To add some data to the database, use the following command:
```bash
$ npm run migrate
```

Running the tests will also create some data.

```bash
# run in developement mode
$ npm start

```
or
```bash
# also runs in development mode
$ node index.js
```
or if you have the heroku cli installed
```bash
$ heroku local web
```
 ### Important for running the node server
When running in "dev" mode navigate to [http://localhost:5000](http://localhost:5000) to see the application.


## Development protocol notes

The branch \<dev\> is the current mainline for development, pull from this branch `git fetch` to get the lasest code base, run `npm install -i`, create your branch `git checkout -b <your-branch>` and make your changes.

On completion of your code changes push your branch to the repository, `git push origin <your-branch>` and create pull request for merging.

Siginificant updates to the app can be merged to production, which will auto-deploy to the [heroku hosted app](https://morning-escarpment-88913.herokuapp.com/), this requires a reviewed pull request before merging. The Heroku pipline can create a temporary review app for all open pull requests, but needs to be connected to the grapheneDB if api requests are required for testing.

## Using Gulp
### Installing
Use the following command to install gulp globally. This will enable using gulp commands.
```
$ npm install -g gulp
```

### Compiling/Concatenating Javascript

**Don't edit package.js manually. It is created by gulp. Edit the files in ./client/assets/js instead**

Gulp is currently set to concatenate the following files to ./client/js/package.js
 - Angular (node_modules/angular/angular.js)
 - Angular-route (node_modules/angular-route/angular-route.js)
 - jQuery (node_modules/jquery/dist/jquery.js)
 - Bootstraper file (creates ng module) (./client/assets/js/bootstrapper.js)
 - Angular Controllers (any file under ./client/assets/js/controllers)
 - Angular POJOs/models (currently ./client/assets/js/venues)
 - Angular routes (./client/assets/js/routes.js)

Use ./gulpfile.js to add more.

Use the following command to manually process the above files:
```
$ gulp scripts
```

Gulp can also watch all files in ./client/js for changes and automatically process them when they're saved.
Note: This will also watch less files.
```
$ gulp watch
```

### Compiling less
Gulp compiles assets/less/style.less -> css/style.css

Any files that are imported to that file @import() will automatically be included.
 - bootstrap.custom.less - Includes all the bootstrap components we need from it's source. Uncomment lines in this file to add components.
 - bootstrap.variables.less - Use this file to override variables used by bootstrap as it's compiled. (see bootstrap source)
 - variables.less - Variables for use in our own less/css
 - *.less - The rest of the files contain own css/less. Each new file has to be manually added with an @import() to style.less

To compile all less files -> style.less, run the following command:
```
$ gulp less
```

As with the scripts, the less files are automatically watched for changes.
```
$ gulp watch
```