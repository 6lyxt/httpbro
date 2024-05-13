import {HttpBroConstruct, HttpBroError, HttpBroResponse, HttpBroType} from "./@types/@httpbro";

/**
 * @class HttpBro
 * @description HttpBro is a class that allows you to make http requests with ease
 * @constructor
 * @param baseURL
 * @param baseAuth
 * @param baseHeaders
 * @method make
 * @method request
 * @method get
 * @method post
 * @method put
 * @method patch
 * @method delete
 * @method update
 * @method head
 * @method options
 * @method getHeaders
 *
 */
class HttpBro {
    private baseURL: string | undefined;
    private baseAuth: string | undefined;
    private baseHeaders: { name: string, value: string }[];

    /**
     * HttpBro is a class that allows you to make http requests with ease,
     * and convert the response to the desired type (using make)
     * @param baseURL
     * @param baseAuth
     * @param baseHeaders
     */
    constructor({baseURL, baseAuth, baseHeaders}: HttpBroConstruct) {
        this.baseURL = baseURL;
        this.baseAuth = baseAuth;
        this.baseHeaders = baseHeaders || [];
    }

    /**
     * "Make" (transform) response
     * @param response
     * @param type
     */
    public async make(response: Response, type: HttpBroType): Promise<any> {
        const res = await response;

        switch (type) {
            case "json":
                return res.json();
            case "plain":
                return res.text();
            case "blob":
                return res.blob();
            case "formData":
                return res.formData();
            case "buffer":
                return res.arrayBuffer();
            case "stream":
                return res.body;
            default:
                throw new Error(`Unsupported response type: ${type}`) as HttpBroError;
        }
    }

    /**
     * Request
     * @param url
     * @param method
     * @param data
     * @param type
     * @private
     */
    private async request(url: string, method: string, data?: any, type?: HttpBroType): Promise<HttpBroResponse> {
        const headers: HeadersInit = {
            ...this.getHeaders(),
            Authorization: this.baseAuth || '',
            "Content-Type": "application/json",
        };

        const response = await fetch(`${this.baseURL}${url}`, {
            method,
            headers,
            body: JSON.stringify(data),
        });

        if (type) {
            return this.make(response, type);
        }

        return response;
    }

    /**
     * Get
     * @param url
     */
    public async get(url: string): Promise<HttpBroResponse> {
        return await this.request(url, "GET");
    }

    /**
     * Post
     * @param url
     * @param data
     */
    public async post(url: string, data: any): Promise<HttpBroResponse> {
        return await this.request(url, "POST", data);
    }

    /**
     * Put
     * @param url
     * @param data
     */
    public async put(url: string, data: any): Promise<HttpBroResponse> {
        return await this.request(url, "PUT", data);
    }

    /**
     * Patch
     * @param url
     * @param data
     */
    public async patch(url: string, data: any): Promise<HttpBroResponse> {
        return await this.request(url, "PATCH", data);
    }

    /**
     * Delete
     * @param url
     */
    public async delete(url: string): Promise<HttpBroResponse> {
        return await this.request(url, "DELETE");
    }

    /**
     * Update
     * @param url
     * @param data
     */
    public async update(url: string, data: any): Promise<HttpBroResponse> {
        return await this.request(url, "UPDATE", data);
    }

    /**
     * Head
     * @param url
     */
    public async head(url: string): Promise<HttpBroResponse> {
        return await this.request(url, "HEAD");
    }

    /**
     * Options
     * @param url
     */
    public async options(url: string): Promise<HttpBroResponse> {
        return await this.request(url, "OPTIONS");
    }

    /**
     * Drop headers
     *
     * @param headerName if left empty, all headers will be dropped
     */
    public dropHeaders(headerName?: string): void {
        if (!headerName) {
            this.baseHeaders = [];
        } else {
            this.baseHeaders = this.baseHeaders.filter(({name}) => name !== headerName);
        }
    };

    /**
     * Get headers
     * @private
     */
    private getHeaders() {
        return this.baseHeaders.reduce((acc, {name, value}) => {
            acc[name] = value;
            return acc;
        }, {} as Record<string, string>);
    }
}

export default HttpBro;
