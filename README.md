# ExpressJS REST API

_You can follow my e2e test at ./test/e2e.test.js to understand the workflow_

## Features:
- Registration
- Login
- JWT authentication
- Private routes example
- Schema Validation check (username validation, minimum characters, etc.)
- Password Encryption
- MongoDB Database
- Allow authenticated user upload image onto server

## Setup
1. Clone the project
```
git clone https://github.com/eLotus-x-Hung/Hackathon
```
2. Install packages
```
npm install
```
3. Setup environment variables: Create .env file in root of the project and set 3 enviroment variables
```
PORT = ""

DB_URL = ""

JWT_SECRET = ""

EXPIRE_TOKEN_TIME = 2s
```
  > **PORT:** Port number for local host <br/>
  > **DB_URL:** MongoDB URL, You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as database <br/>
  > **JWT_SECRET:** A random string that will be used for JWT encoding and authentication <br/>
  > **EXPIRE_TOKEN_TIME:** An expired time of jwt token <br/>

4. Run the project
```
node app.js
```
OR, if you have [nodemon](https://www.npmjs.com/package/nodemon) installed
```
npm start
```

## API endpoints

| **Endpoint** | **Purpose**                                                                                          | **Features**                                                                                                                     |
| :------------- |:-----------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------|
| / | Homepage                                                                                             | None                                                                                                                             |
| /api/user/register | Registration route that saves information of a new user on the database                              | Duplicate user check, password hashing                                                                                           |
| /api/user/login | Login route that returns token on successful login                                                   | User existance check, Password match check, JWT Creation                                                                         |
| /api/private | Example private route that can't be accessed without a token                                         | "auth-token" header is required, which means user must be logged in to access this route                                         |
| /api/upload | Upload route that store image and information of user | "auth-token" header is required, which means user must be logged in to access this route </br>  An user upload image onto server |


## Production dependencies
| **Package** | **Version** | **Purpose**                          |
| :------------- | :---------- |:-------------------------------------|
| [express](https://expressjs.com/) | ^4.17.1 | Creating the REST API                |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  | ^8.5.1 | Generating JWT and Authenticating it |
| [mongoose](https://www.npmjs.com/package/mongoose) | ^6.0.9 | Connecting to MongoDB                |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | ^2.4.3 | Hashing the password                 |
| [@hapi/joi](https://www.npmjs.com/package/joi) | ^17.1.1 | Schema validation check              |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^10.0.0 | Loads environment variables          |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.5| enable CORS                          |
| [multer](https://www.npmjs.com/package/multer) | ^1.4.5-lts.1| Uploading files                      |
