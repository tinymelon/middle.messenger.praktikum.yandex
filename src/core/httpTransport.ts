import constants from "../constants";

type Options = {
    timeout?: number,
    method?: string,
    data?: any,
    headers?: Record<string, string>
}

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = <R=unknown>(url: string, options?: OptionsWithoutMethod) => Promise<R>

export default class HttpTransport {
    METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    } as const;

    private readonly apiUrl: string = ''

    constructor(apiPath: string) {
        this.apiUrl = `${constants.HOST}${apiPath}`;
    }

    get: HTTPMethod = (url, options = {}) => {
        const {data, timeout} = options;
        url = (typeof data == 'object') ? `${url}${this.queryStringify(data)}` : url;
        return this.request(`${this.apiUrl}${url}`, {...options, method: this.METHODS.GET}, timeout);
    };

    post: HTTPMethod = (url, options = {}) => {
        return this.request(`${this.apiUrl}${url}`, {...options, method: this.METHODS.POST}, options.timeout);
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(`${this.apiUrl}${url}`, {...options, method: this.METHODS.PUT}, options.timeout);
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(`${this.apiUrl}${url}`, {...options, method: this.METHODS.DELETE}, options.timeout);
    };

    queryStringify(data: Record<any, any>): string {
        if (typeof data !== 'object') {
            throw new TypeError('Data must be object');
        }

        const keys = Object.keys(data);
        // eslint-disable-next-line unicorn/no-array-reduce
        return keys.reduce((result, key, index) => {
            return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
        }, '?');
    }

    async request<TResponse>(url: string, options: Options = {}, timeout = 5000): Promise<TResponse> {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open(
                method,
                url
            );


            for (const key of Object.keys(headers)) {
                xhr.setRequestHeader(key, headers[key]);
            }

            xhr.addEventListener('load', function() {
                const isJson = xhr.getResponseHeader('content-type')?.includes('application/json');
                const response = isJson ? JSON.parse(xhr.response) : xhr.response;
                if (this.status >= 400) reject(response);
                resolve(response);
            });

            xhr.addEventListener('abort', reject);
            xhr.addEventListener('error', reject);

            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            if (!data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
