# zerozilla_interview_task

Localhost URL: http://localhost:9481

Deployed base URL: http://13.126.10.20:9481

1) Createing Agency and Clinet in Signle API requests.
API: "/agency/v1/create";
Method: "POST";
request:
{
    "AgencyId":"AG-01",
    "Name":"TESTING",
    "Address1":"NA",
    "Address2":"NA",
    "State":"Karnataka",
    "City":"Bangalore",
    "PhoneNumber":"1234567890",
    "Client":{
        "ClientId":"CL-01",
        "Name":"Sample",
        "Email":"sample@gmail.com",
        "PhoneNumber":"9087654321",
        "TotalBill":1000
    }
}

Response: when successfully created
{
    "status": true,
    "message": "created"
}

Response: when request params are misses
{
    "status": false,
    "message": "errors",
    "errors": [
        {
            "msg": "Address2 is requied",
            "param": "Address2",
            "location": "body"
        }
    ]
}
Response: when trying tyo create duplicate agency
{
    "status": false,
    "message": "E11000 duplicate key error collection: testingdb.agencies index: agency_id_1 dup key: { agency_id: null }"
}

2) Updating Client Details
API: "/agency/v1/update";
Method: "PUT";
request:
{
    "ClientId":"CL-01",
    "Name":"Sample TESTING",
    "Email":"sample@gmail.com",
    "PhoneNumber":"9087654321",
    "TotalBill":1000,
    "AgencyId":"AG-01"
}

Response:
{
    "status": true,
    "message": "updated"
}

3) API should return name of agency along with client details which has top client(s) with maximum total bill
API: agency/v1/top_clients_agencies
Method: "GET",
Request: {},
Response:
{
    "status": true,
    "message": "success",
    "top_clients_list": [
        {
            "AgencyName": "TESTING NAME",
            "ClientName": "Sample TESTING",
            "TotalBill": 40000
        },
        {
            "AgencyName": "TESTING NAME",
            "ClientName": "Sample",
            "TotalBill": 10000
        }
    ]
}
