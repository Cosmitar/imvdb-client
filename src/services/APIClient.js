"user strict";

var singletonClient = false;

class APIClient {
    
    toQueryString(obj) {
        var str = [];
        for(var p in obj){
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }

    fetch(endpoint, method, payload) {
        let _headers = { 
            'Accept': 'application/json'
        };
        let _url;
        let _payload;

        console.warn("IMVDB-APP-KEY is not supported for server despite the docs say it's required");
        if (false) {
            _headers['IMVDB-APP-KEY'] = 'IhnAWYYqa6wjAnQXPPWhYs0ODhDY8nJRE6rB4q1f';
        }

        _url = `http://imvdb.com/api/v1${endpoint}`;

        if (method === 'GET') {
            if (payload) {
                let separator = _url.indexOf('?') !== -1 ? "&" : "?";
                _url = _url+separator+this.toQueryString(payload);
            }
        } else {
            _payload = JSON.stringify(payload);
        }

        let checkStatus = (response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }

        let parseJSON = (response) => {
            return response.json();
        }

        return fetch(_url, {
            method: method || 'GET',
            headers: _headers,
            body: _payload
        }).then(checkStatus)
        .then(parseJSON)
    };

    loginRequest(url) {
        return this.fetch(url)
    }

    request( url, method, payload  ) {
        return this.fetch( url, method, payload );
    }
}

if( !singletonClient ) {
    singletonClient = new APIClient;
}

export default singletonClient;