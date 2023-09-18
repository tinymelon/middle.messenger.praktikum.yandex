class HttpTransport {
    get = (url, options = {}) => {

        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url, options = {}, timeout = 5000) => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            for (const key of Object.keys(headers)) {
                xhr.setRequestHeader(key, headers[key]);
            }

            xhr.addEventListener('load', function() {
                resolve(xhr);
            });

            xhr.addEventListener('abort', reject);
            xhr.addEventListener('error', reject);

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
