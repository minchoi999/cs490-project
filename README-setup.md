### Create .env file on the same level as server.js:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/
GITHUB_CLIENT_ID=<Supply dummy string if does not have>
GITHUB_CLIENT_SECRET=<Supply dummy string if does not have>
GITHUB_CALLBACK=http://127.0.0.1:3000/auth/github/callback
FACEBOOK_CLIENT_ID=<Supply dummy string if does not have>
FACEBOOK_CLIENT_SECRET=<Supply dummy string if does not have>
FACEBOOK_CALLBACK=http://127.0.0.1:3000/auth/facebook/callback
GOOGLE_CLIENT_ID=<Supply dummy string if does not have>
GOOGLE_CLIENT_SECRET=<Supply dummy string if does not have>
GOOGLE_CALLBACK=http://127.0.0.1:3000/auth/google/callback
```

### frontend package.json
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
#### For deployment
```
  "proxy": "http://localhost:5000"
```