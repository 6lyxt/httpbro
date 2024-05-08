import {HttpBroConstruct, HttpBroResponse, HttpBroType} from "./@types/@httpbro";

class HttpBro {
    private baseURL: string | undefined;
    private baseAuth: string | undefined;
    private baseHeaders: { name: string, value: string }[];

    constructor({baseURL, baseAuth, baseHeaders}: HttpBroConstruct) {
        this.baseURL = baseURL;
        this.baseAuth = baseAuth;
        this.baseHeaders = baseHeaders || [];
    }

    public async make(response: Response, type: HttpBroType): any {
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
                throw new Error(`Unsupported response type: ${type}`);
        }
    }

    private async request(url: string, method: string, data?: any, type?: HttpBroType): Promise<HttpBroResponse> {
        const response = await fetch(`${this.baseURL}${url}`, {
            method,
            headers: {
                ...this.getHeaders(),
                Authorization: this.baseAuth,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (type) {
            return this.make(response, type);
        }
        return response;
    }

    public async get(url: string): Promise<HttpBroResponse> {
        return await this.request(url, "GET");
    }

    public async post(url: string, data: any): Promise<HttpBroResponse> {
        return await this.request(url, "POST", data);
    }

    public async put(url: string, data: any): Promise<HttpBroResponse> {
        return await this.request(url, "PUT", data);
    }

    public async patch(url: string, data: any): Promise<HttpBroResponse> {
        return await this.request(url, "PATCH", data);
    }

    public async delete(url: string): Promise<HttpBroResponse> {
        return await this.request(url, "DELETE");
    }

    public async update(url: string, data: any): Promise<HttpBroResponse> {
        return await this.request(url, "UPDATE", data);

    }

    public async head(url: string): Promise<HttpBroResponse> {
        return await this.request(url, "HEAD");

    }

    public async options(url: string): Promise<HttpBroResponse> {
        return await this.request(url, "OPTIONS");

    }

    private getHeaders() {
        return this.baseHeaders.reduce((acc, {name, value}) => {
            acc[name] = value;
            return acc;
        }, {} as Record<string, string>);
    }
}

export default HttpBro;
