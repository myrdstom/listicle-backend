[![Maintainability](https://api.codeclimate.com/v1/badges/d9eab63c8846d4b66105/maintainability)](https://codeclimate.com/github/myrdstom/listicle-backend/maintainability)
[![Build Status](https://travis-ci.org/myrdstom/listicle-backend.svg?branch=develop)](https://travis-ci.org/myrdstom/listicle-backend)
[![Coverage Status](https://coveralls.io/repos/github/myrdstom/listicle-backend/badge.svg?branch=develop)](https://coveralls.io/github/myrdstom/listicle-backend?branch=develop)
# Authors Haven
## Vision
Create a community of like minded authors to foster inspiration and innovation by leveraging the modern web.

### Api Spec

### Errors and Status Codes

If a request fails any validations, expect errors in the following format:

```
{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
```
### Endpoints

### Authentication

``POST: /api/user/login``

Example request body

```
{
	"email": "paulk@gmail.com",
	"password":"P@ssword",
}
```

### Registration
``POST: /api/user/register``

Example request Body

```
{
	"email": "paulk@gmail.com",
	"password":"P@ssword",
	"name":"Paul Kayongo"
}
```
