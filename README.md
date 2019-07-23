[![Maintainability](https://api.codeclimate.com/v1/badges/d9eab63c8846d4b66105/maintainability)](https://codeclimate.com/github/myrdstom/listicle-backend/maintainability)
[![Build Status](https://travis-ci.org/myrdstom/listicle-backend.svg?branch=develop)](https://travis-ci.org/myrdstom/listicle-backend)
[![Coverage Status](https://coveralls.io/repos/github/myrdstom/listicle-backend/badge.svg?branch=develop)](https://coveralls.io/github/myrdstom/listicle-backend?branch=develop)
# Authors Haven
## Vision
Create a community of like minded authors to foster inspiration and innovation by leveraging the modern web.

##Hosting

This application is hosted at this [link](https://listicle-backend.herokuapp.com/api/articles)

## Setup

 - Clone the repository using the following command
    ```
    git clone https://github.com/myrdstom/listicle-backend.gi
    ```

- Install all the necessary packages using the command below
    ```
    yarn install
    ```

- Add a config file in the root of the folder with two files, `dev.env` and `test.env`

- Populate both files with appropriate data using the `.env.example file as a template`

## Api Spec

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
## Endpoints

### Authentication

``POST: /api/user/login``

Example request body

```
{
	"email": "paulk@gmail.com",
	"password":"P@ssword",
}
```

``GET: /api/user/current``

Gets the current logged in user

Example retruned request

```
{
    "email": "nserekopaul@gmail.com",
    "msg": "success"
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

### Profiles

#### Get a logged in user's profile
``GET: /api/profile/``

#### Create or edit a logged in user's profile
``POST: /api/profile/``
