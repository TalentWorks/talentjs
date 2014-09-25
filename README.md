# TalentJS
REST API server for talent clients

*The TalentJS API project is still on an early and immature state. Therefore, the interface 
exposed by the API will evolve. Expect frequent changes that, in some cases, will break existing code.*   

## Authentication
Some API calls require clients to provide authentication using HTTP Basic authentication.

    Authorization: Basic <token>

## Get list of all users
**Request**

    GET /api/users
    
**Response**

    HTTP 200
    [
      {
        "_id":"53c8242710cb6fc813dac19d",
        "firstName":"Isabel",
        "lastName":"Raggi",
        "primaryEmail":"isa@email.com",
        "__v":0
      },
      {
        "_id":"53c8244010cb6fc813dac19e",
        "firstName":"Federico",
        "lastName":"Raggi",
        "primaryEmail":"feder@email.com",
        "__v":0
      },
      ... additional results ...
    ]
    

**Notes**

- Requires authentication
- Use for debugging only; it will NOT be supported on a production environment

**Known Issues**

- Requests with a '/' appended at the end of the path (/api/users/) will fail instead of being redirected to /api/users  

## Get user details

**Request**

    GET /api/users/53c8242710cb6fc813dac19d
    
**Response**

    HTTP 200
    
    {
      "_id":"53c8242710cb6fc813dac19d",
      "firstName":"Isabel",
      "lastName":"Raggi",
      "primaryEmail":"isa@email.com",
      "__v":0
    }

**Notes**

- Requires authentication

## Create a new user
**Request**

    POST /api/users
    
    {
      "firstName":"User",
      "lastName":"JoseUser",
      "primaryEmail":"JoseUser@email.com",
      "password":"hello"
    }
    
**Response**

    HTTP 201

**Notes**

## Update a user's properties or change its password
**Request**

    PUT /api/users
    
    {
      "firstName":"User",
      "lastName":"JoseUser",
      "primaryEmail":"JoseUser@email.com",
      "password":"hello"
    }
    
**Response**

    HTTP 200

**Notes**

- Requires authentication
- Only properties included on the request will be modified
- Password can be changed by providing a new value


