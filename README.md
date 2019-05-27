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
