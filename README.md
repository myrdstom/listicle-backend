[![Maintainability](https://api.codeclimate.com/v1/badges/d9eab63c8846d4b66105/maintainability)](https://codeclimate.com/github/myrdstom/listicle-backend/maintainability)
[![Build Status](https://travis-ci.org/myrdstom/listicle-backend.svg?branch=develop)](https://travis-ci.org/myrdstom/listicle-backend)
[![Coverage Status](https://coveralls.io/repos/github/myrdstom/listicle-backend/badge.svg?branch=develop)](https://coveralls.io/github/myrdstom/listicle-backend?branch=develop)
# Authors Haven
## Vision
Create a community of like minded authors to foster inspiration and innovation by leveraging the modern web.
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

Example retruned request

```
{
    "_id": "5d34065a629a60b747bfaaf2",
    "user": "5d336ea815fdbaa5aade82da",
    "bio": "I am an awesome developer",
    "firstName": "Paul",
    "lastName": "Kayongo",
    "date": "2019-07-21T06:29:46.167Z"
}
```

#### Create or edit a logged in user's profile
``POST: /api/profile/``
```
{
	"bio": "I am an awesome developer",
    "firstName": "Paul",
    "lastName": "Kayongo"
}
```

### Articles

#### Get all articles
``GET: /api/articles/``

Example retruned request

```
[
    {
        "_id": "5d33249f1cafb392e481bc5c",
        "title": "Python",
        "description": "Data science and python",
        "body": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                ab illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                quia non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                nostrum exercitationem ullam corporis suscipit laboriosam, nisi
                ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil molestiae
                consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        "user": "5d33242c1cafb392e481bc58",
        "likes": [
            {
                "_id": "5d3324af1cafb392e481bc5d",
                "user": "5d33242c1cafb392e481bc58"
            }
        ],
        "dislikes": [],
        "comments": [
            {
                "createdAt": "2019-07-20T14:27:23.967Z",
                "_id": "5d3324cb1cafb392e481bc5e",
                "body": "This article is amazing",
                "user": "5d33242c1cafb392e481bc58"
            }
        ],
        "createdAt": "2019-07-20T14:26:39.500Z",
        "articleSlug": "python",
        "__v": 2
    }
]
```

#### Get an article
``GET: /api/articles/python``

Example retruned request

```
{
        "_id": "5d33249f1cafb392e481bc5c",
        "title": "Python",
        "description": "Data science and python",
        "body": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                ab illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                quia non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                nostrum exercitationem ullam corporis suscipit laboriosam, nisi
                ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil molestiae
                consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        "user": "5d33242c1cafb392e481bc58",
        "likes": [
            {
                "_id": "5d3324af1cafb392e481bc5d",
                "user": "5d33242c1cafb392e481bc58"
            }
        ],
        "dislikes": [],
        "comments": [
            {
                "createdAt": "2019-07-20T14:27:23.967Z",
                "_id": "5d3324cb1cafb392e481bc5e",
                "body": "This article is amazing",
                "user": "5d33242c1cafb392e481bc58"
            }
        ],
        "createdAt": "2019-07-20T14:26:39.500Z",
        "articleSlug": "python",
        "__v": 2
    }
```

#### Create or edit an article
``POST: /api/articles/``
```
{
	"title" : "Python",
	
	"description": "Data science and python",
	
	"body": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
            et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia 
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
            qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia 
            dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora 
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima 
            veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid 
            ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate 
            velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo 
            voluptas nulla pariatur?"
}
```

#### Create or edit an article
``DELETE: /api/articles/python``
```
{
	"msg": "article succesfully deleted"
}
```

### Likes and Dislikes
#### Like an article
``POST: /api/articles/like/:articleSlug``

#### Unlike an article
``POST: /api/articles/like/:articleSlug``

#### Dislike an article
``POST: /api/articles/like/:articleSlug``

#### un-dislike an article
``POST: /api/articles/like/:articleSlug``


### Comments

#### Create a comment
``POST: /api/articles/comment/:articleSlug``

Example request body

```
{
	"body" :"Well Python is not as awesome as javascript"

}

```

#### Delete a comment
``POST: /api/articles/comment/:articleSlug/:id``

Example returned body
```
{
	"msg": "comment succesfully deleted"
}
```

