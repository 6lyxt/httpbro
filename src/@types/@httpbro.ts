export type HttpBroConstruct = {
    baseURL?: HttpBroUrl;
    baseAuth?: HttpBroAuth;
    baseHeaders?: HttpBroHeader[];
}

export type HttpBroUrl = string;

export type HttpBroAuth = string;

export type HttpBroHeader = {
    name: string;
    value: string;
}

export type HttpBroError = Error;

export type HttpBroResponse = Response;

export type HttpBroType = "json" | "plain" | "blob" | "formData" | "buffer" | "stream";
