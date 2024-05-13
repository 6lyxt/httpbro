import httpbro from "../httpbro";
import {HttpBroResponse} from "../@types/@httpbro";


/**
 * testing all http functions
 */
const test = async () => {
    const bro = new httpbro({
        baseURL: "http://httpbun.org",
    });

    // testing all http methods
    let get = bro.get("/get");
    await getResponse(bro, get);

    let post = bro.post("/post", {name: "John Doe"});
    await getResponse(bro, post);

    let put = bro.put("/put", {name: "John Doe"});
    await getResponse(bro, put);

    let patch = bro.patch("/patch", {name: "John Doe"});
    await getResponse(bro, patch);

    let del = bro.delete("/delete");
    await getResponse(bro, del);

    let head = bro.head("/head");
    await getResponse(bro, head);

    let update = bro.update("/update", {name: "John Doe"});
    await getResponse(bro, update);

    let options = bro.options("/options");
    await getResponse(bro, options);


    // creating a new instance of httpbro with base headers
    // for detail, see the function getBaseHeaders
    const headBro = new httpbro({
        baseURL: "http://httpbun.org",
        baseHeaders: getBaseHeaders(true)
    });

    let hasHeader = headBro.put("/put", {name: "John Doe"}); // this will have the header "EXAMPLE-KEY"

    // dropping the base header "EXAMPLE-KEY"
    headBro.dropHeaders('EXAMPLE-KEY');

    let noHeader = headBro.put("/put", {name: "John Doe"}); // this will not have the header "EXAMPLE-KEY"
}

const getBaseHeaders = (doINeedKey: boolean) => {
    // this is an example of how to set a base header
    let head = [
        {
            name: "EXAMPLE-KEY",
            value: "bro"
        }
    ];

    // by splitting the headers into an array, we can easily modify the value of the header

    head[0].value = doINeedKey ? "bro" : "no bro";

    return head;
}

const getResponse = async (bro: httpbro, res: Promise<HttpBroResponse>) => {
    bro.make(await res, "json").then((data: any) => {
        console.log(data);
    });
}

test();
