export type HttpBroConstruct = {
    baseURL?: HttpUrl;
    baseAuth?: HttpAuth;
    baseHeaders?: HttpHeader[];
}

export type HttpUrl = string;

export type HttpAuth = string;

export type HttpHeader = {
    name: string;
    value: string;
}

export type HttpBroResponse = Response;

export type HttpBroType = "json" | "plain" | "blob" | "formData" | "buffer" | "stream";
