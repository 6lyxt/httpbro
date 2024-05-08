import httpbro from "../httpbro";

/**
 * testing all http functions
 */
const test = async () => {
    const bro = new httpbro({
        baseURL: "http://httpbun.org",
    });

    let response = bro.get("/get");
    let answer = bro.make(await response, "json").then()
}
