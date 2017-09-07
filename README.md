# Veritone-Api 

## Getting a token
See the docs on authentication at https://veritone-developer.atlassian.net/

## Constructing the api client
```javascript
import veritoneApi from 'veritone-api'
const client = VeritoneApi({
	// requires either session AND api tokens (from user object):
	token: 'my-session-token',
	apiToken: 'my-api-token',

	// OR an oauth token (from oauth grant flow)
	oauthToken: 'my-oauth-token',

	// optional (defaults shown):
	baseUrl: 'https://api.veritone.com',
	version: 1,
	maxRetries: 1,
	retryIntervalMs: 1000
})
```

## Making an API call
### Basic
```javascript
// handlers support both promise and callback styles:

// Callbacks are node-style (err, data). 
// Verify err === null before accessing data. 
// https://nodejs.org/api/errors.html#errors_node_js_style_callbacks

client.recording.getRecordings(function (err, recordings) {
	if (err) {
		// err is an Error or ApiError instance (see ApiError below)
		return console.warn(err);
	}
	
	recordings.forEach(function (recording) {
		console.log(recording);
	})  
});

// promise style
client.recording.getRecordings()
	.then(function (recordings) {
		recordings.forEach(function (recording) {
			console.log(recording);
		})  
	})
	.catch(function (err) {
		// err is an Error or ApiError instance (see ApiError below)
		console.warn(err);
	});
```

If the handler has options, provide them as specified:
```javascript
client.recording.getRecordings({ offset: 5, limit: 10 }, function (err, recordings) {
	// ...
})
```
The callback is always the final (optional) argument

### Advanced
Each handler supports overriding API client options and some request options on a per-call basis. The options object is always the last (when using promise style), or second to last (when a callback is provided) argument.

```javascript
client.recording.getRecordings(
	{ offset: 5, limit: 10 },
	{
		maxRetries: 0,
		headers: {
			'My-Additional-Header': 'hi'
		}
	}, 
	function (err, recordings) {
	// ...
	}
)
```

#### Supported per-call overrides:
* maxRetries -- number
* retryIntervalMs -- number
* timeoutMs -- number
* headers -- object
* transformResponseData -- function
* validateStatus -- number => bool

## Errors
### APIError
Errors related to API calls, including responses with status > 300 and network error are wrapped by ApiError.
#### ApiError fields
* status -- The status code returned by the server
* message -- A string describing the error, if available 
* data -- Error response from the server. May be a string, object, array, etc, depending on the endpoint.
* nativeError -- the raw client error (todo)

## Creating new endpoints
(WIP)
```javascript
const {
			method,
			path,
			data,
			query,
			headers,
			// default options for this request, if different from defaults
			_requestOptions = {
				// maxRetries,
				// retryIntervalMs,
				// timeoutMs,
				// headers,
				// transformResponseData,
				// validateStatus
				// tokenType
			}
		} = request;
```
