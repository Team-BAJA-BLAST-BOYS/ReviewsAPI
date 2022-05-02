
<div align="center" width="100%">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
</div>

<h1 align="center">Threads</h1>

<div align="center" width="100%">
    <img src="src/images/readme/iron-motorcycles.png">
</div>

<h4 align="center">A System Design creation and a recreation of a existing API.</h4>

## Features
PostgreSQL scripts to ETL CSV data into a database.  
A fully functioning server that is able to query the database for information and egress it in a format that would suit the needs of the front end client with response times under 70ms and being able to serve up to 1000 clients on its fastest route. 

## Motivation and Story
After we built out the front end to this eCommerce site, we were given the task to recreate the API that provided the product data to us. Originally the API that we had been using responded with queries that took over 1000ms and would be rate limited to only a couple requests per second. Our takes was to reduce the latency of response times as well as increase the request limit by building the API from the ground up with optimizatons in mind. The minimum goals were to be able to serve 100 requests per second at under 2000ms per request.   
  
I ended up being able to hit those goals and exceed them. My fastest queries ended up being around 64ms serving well up to 1000 requests per second with the help of load balancing and horizontally scaling my API.   
  
The final bottleneck I ended up running into was the AWS instance I was running my database on; with only 1 GB of RAM, it wasn't really able to handle the amount of requests I was trying to make. I didn't quite have time to do so, but I found two options that would have alleviated that issue. The first being sharding my database, setting up a second instance and splitting the requests to both databases, or vertically scale and increase the specs of my database server to be able to handle more of a load. 

## Code Styles
This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

## Tech Stack
**Built with**
- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [Jest](https://jestjs.io/docs/getting-started)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [AWS](https://aws.amazon.com/)

## Repository Installation 
`$ git clone https://github.com/Team-BAJA-BLAST-BOYS/ReviewsAPI.git

Once in the repository make sure to install the required packages.

`$ npm install --production`

Some global credentials are also needed, so make sure to create a .env file.

`$ vim .env`

Within the .env file the following is needed: port, postgres user, postgres user's password.

```env
PORT=<desired port number>
pg_user=<Postgres User with appropriate privileges>
pg_pass=<The Postgres User Password>
```

## Tests
All tests are run using Jest and supertest.

To install Jest please follow the [Getting Started Page](https://jestjs.io/docs/getting-started) on the
Jest website.  
  
In order to understand how supertest is testing responses from the sever, feel free to read up on their documentation [NPM Page for supertest](https://www.npmjs.com/package/supertest).  
  
In order to run tests, run the following command within terminal.

`$ npm run test`

<p align="center">Project extended by <a href="https://github.com/ec-rilo">Danny Wong</a></p>
