type Options = {
    timeout?: number,
    method?: string,
    data?: any,
    headers?: Record<string, string>
}

type HttpMethod = (url: string, options?: Options) => Promise<unknown>

export default class HttpTransport {
    METHODS: Record<string, string> = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    }

    get: HttpMethod = (url: string, options: Options) => {

        return this.request(url, {...options, method: this.METHODS.GET}, options.timeout);
    };

    post: HttpMethod = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: this.METHODS.POST}, options.timeout);
    };

    put: HttpMethod = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: this.METHODS.PUT}, options.timeout);
    };

    delete: HttpMethod = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: this.METHODS.DELETE}, options.timeout);
    };

    queryStringify(data: Record<any, any>) {
        if (typeof data !== 'object') {
            throw new TypeError('Data must be object');
        }


        const keys = Object.keys(data);
        // eslint-disable-next-line unicorn/no-array-reduce
        return keys.reduce((result, key, index) => {
            return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
        }, '?');
    }

    request = (url: string, options: Options = {}, timeout = 5000) => {
        const {headers = {}, method, data} = options;
        // eslint-disable-next-line unicorn/no-this-assignment
        const self = this;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === self.METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${self.queryStringify(data)}`
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
