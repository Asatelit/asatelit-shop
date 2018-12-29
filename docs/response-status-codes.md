When Areama receives a request to an API endpoint, a number of different HTTP status codes can be returned in the response depending on the original request.

200 OK
The request was successfully processed by Areama.
201 Created
The request has been fulfilled and a new resource has been created.
202 Accepted
The request has been accepted, but not yet processed.
303 See Other
The response to the request can be found under a different URI in the Location header and can be retrieved using a GET method on that resource.
400 Bad Request
The request was not understood by the server, generally due to bad syntax or because the Content-Type header was not correctly set to application/json.

This status is also returned when the request provides an invalid code parameter during the OAuth token exchange process.

401 Unauthorized
The necessary authentication credentials are not present in the request or are incorrect.
402 Payment Required
The requested shop is currently frozen.
403 Forbidden
The server is refusing to respond to the request. This is generally because you have not requested the appropriate scope for this action.
404 Not Found
The requested resource was not found but could be available again in the future.
406 Not Acceptable
The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.
422 Unprocessable Entity
The request body was well-formed but contains semantical errors. The response body will provide more details in the errors or error parameters.
423 Locked
The requested shop is currently locked.
429 Too Many Requests
The request was not accepted because the application has exceeded the rate limit. See the API Call Limit documentation for a breakdown of Areama's rate-limiting mechanism.
500 Internal Server Error
An internal error occurred in Areama. Please post to the API & Technology forum so that Areama staff can investigate.
501 Not Implemented
The requested endpoint is not available on that particular shop, e.g. requesting access to a Plus-specific API on a non-Plus shop. This response may also indicate that this endpoint is reserved for future use.
503 Service Unavailable
The server is currently unavailable. Check the status page for reported service outages.
504 Gateway Timeout
The request could not complete in time. Try breaking it down in multiple smaller requests.
