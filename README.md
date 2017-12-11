# Service Learning Dashboard  [![Jenkins](https://img.shields.io/jenkins/s/https/jenkins.qa.ubuntu.com/view/Precise/view/All%20Precise/job/precise-desktop-amd64_default.svg?style=flat-square)]()

[![Node.js](https://cdn.rawgit.com/aleen42/badges/master/src/node.svg?style=flat-square)](#)
[![React Badge](https://cdn.rawgit.com/aleen42/badges/master/src/react.svg?style=flat-square)](#)
[![Webpack Badge](https://cdn.rawgit.com/aleen42/badges/master/src/webpack.svg?style=flat-square)](#)

The Service Learning Dashboard is a centralized, web-based, time tracking platform that allows students, facutly, and staff to quickly and efficently track their volunteering contributions to the community. Designed by students, for students.

## Getting Started

Local development instructions coming soon.

```
# Clone with SSH
git clone git@github.ccs.neu.edu:CS4500/102.git

# Install yarn and dependencies
npm i -g yarn
yarn

# Start full application
yarn start

# Start backend server
yarn start:server

# Start frontend client
yarn start:client

# Try visiting the front end
localhost:3000/

# The API server is proxied from :3001/api to :3000/api for conveineince
```

## Database
IP address for remote: 34.239.24.224:27017
```
use service-learning
```
* Email wong.christ@husky.neu.edu for access

## Running the tests and coverage

Run all tests
```
yarn test
```
* note, this will run unit and integration tests along with generating Istanbul coverage reports in the /coverage folder

Run unit tests
```
yarn test:unit
```

Run integration tests
```
yarn test:integration
```

## Provision Server
Run the server setup script
```
bash scripts/provision_server.sh
```

## Deployment
CI/CD Pipeline fully automated via Jenkins.

Jenkins runs the following stages:
```
1. Setup - clean the directory, checkout new code, install dependencies
2. Lint - check for any style errors (consider adding static source code analysis)
3. Unit Tests
4. Integration Tests - most of these tests need the database, so they are run on our staging env.
5. Build and Deploy 
```

## Coding Style
This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Authors:

* **John Gallagher**
* **Anirudh Katipally**
* **Alex Knauth**
* **Courtney Oka**
* **Christopher Wong**

## Built With:

* [Node.js](https://nodejs.org/en/) - An asyncronous server-side JavaScript framework.
* [React](https://reactjs.org) - A JavaScript library for building user interfaces
* [MongoDB](https://www.mongodb.com) - NoSQL Database Management System

## License

This project has currently not decided under a license. Check back for details.
