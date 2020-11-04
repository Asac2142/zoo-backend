# # ![alt text](https://yo-toronto.com/wp-content/uploads/2016/05/YoToronto_LandmarkIcon_TOZoo-map.png) 
# Zoo Ecuador - API

API REST service for [Zoo Ecuador](https://github.com/Asac2142/zoo-frontend)

## Requirements

In order to use this app, make sure you have installed [NodeJS](https://nodejs.org/en/) in your computer.

## Installation

```javascript
npm install
```

## Run

```javascript
node index.js
```

## Test

```javascript
npm test
```

## Description

- This application make use of these tools:
  - ExpressJS
  - Body-Parser
  - Joi
  - CORS


## API Requests

```bash
PATCH   http://localhost:3142/api/animals/{id}
PUT     http://localhost:3142/api/animals/ - requeries {body}
POST    http://localhost:3142/api/animals - requeries {body}
GET     http://localhost:3142/api/animals/
DELETE  http://localhost:3142/api/animals/delete/{id}
```

## Notes

- By default, the application runs at port: 3142
