# TalentJS
REST API server for talent clients

## Authentication
Some API calls require clients to provide authentication using HTTP Basic authentication.
 
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
    
Requires Auth? Yes

***Note:*** This call is for debugging only and is NOT supported on a production environment 

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

