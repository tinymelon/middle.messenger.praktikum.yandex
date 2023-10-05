import constants from "../constants";

type Options = {
    timeout?: number,
    method?: string,
    data?: any,
    headers?: Record<string, string>
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HttpTransport {
    METHODS: Record<string, string> = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    }

    private readonly apiUrl: string = ''

    constructor(apiPath: string) {
        this.apiUrl = `${constants.HOST}${apiPath}`;
    }

    get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: this.METHODS.GET}, options.timeout);
    };

    post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: this.METHODS.POST}, options.timeout);
    };

    put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: this.METHODS.PUT}, options.timeout);
    };

    delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: this.METHODS.DELETE}, options.timeout);
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
        // eslint-disable-next-line unicorn/no-this-assignment
        const self = this;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === self.METHODS.GET;
            xhr.withCredentials = true;
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
                const isJson = xhr.getResponseHeader('content-type')?.includes('application/json');
                const response = isJson ? JSON.parse(xhr.response) : xhr.response;
                if (this.status >= 400) reject(response);
                resolve(response);
            });

            xhr.addEventListener('abort', reject);
            xhr.addEventListener('error', reject);

            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
