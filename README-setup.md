# Getting started

## Hook up a MongoDB: either locally or remotely
### If run MongoDB locally
```
// Install MongoDB
// Make a local storage: say d:/mongodb/data
// Open one cmd (1st one)
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath="d:\mongodb\data"

// Need to see this: [initandlisten] waiting for connections on port 27017

// Connect to MongoDB: open ANOTHER cmd (2nd one)
"C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
```
## Clone git repo
```
git clone https://github.com/minchoi999/cs490-project.git
```
## At root level, i.e. backend part
### Create .env file on the same level as server.js:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/<Supply your database name>
GITHUB_CLIENT_ID=<Supply dummy string if does not have>
GITHUB_CLIENT_SECRET=<Supply dummy string if does not have>
GITHUB_CALLBACK=http://localhost:3000/auth/github/callback
FACEBOOK_CLIENT_ID=<Supply dummy string if does not have>
FACEBOOK_CLIENT_SECRET=<Supply dummy string if does not have>
FACEBOOK_CALLBACK=http://127.0.0.1:3000/auth/facebook/callback
GOOGLE_CLIENT_ID=<Supply dummy string if does not have>
GOOGLE_CLIENT_SECRET=<Supply dummy string if does not have>
GOOGLE_CALLBACK=http://127.0.0.1:3000/auth/google/callback
```
### Open a terminal/cmd for backend
### Install dependencies
```
npm install
```
### Run: for development
```
npm run start-dev
```
### Should see
```
API running on port 5000
MongoDB is connected
```

## Go to frontend folder
### Open another terminal/cmd for frontend
### Install dependencies
```
npm install
```
### Run
```
npm start
```
Should open a browser automatically on http://localhost:3000

### In frontend/package.json
#### For development
```
  "proxy": {
    "/auth": {
      "target": "http://localhost:5000"
    },
    "/api": {
      "target": "http://localhost:5000"
    }
  }

```
#### For deployment: Heroku
```
  "proxy": "http://localhost:5000"
```
