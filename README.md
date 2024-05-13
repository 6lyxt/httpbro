# httpbro 🤙
**httpbro** is a typescript http library with custom types and built-in helper functions

## usage
you can create a new httpbro instance:

```
const bro = new httpbro({
  baseURL: "http://httpbun.org",
  baseAuth: "Basic user:pass",
  baseHeaders: [{
            name: "EXAMPLE-KEY",
            value: "bro"
  }]
});
```
using this instance, you can make http requests:

```
const request = bro.get("/get");
```

and then, you can convert it to a json object:

```
bro.make(await request, "json").then((data) => {
  console.log(data);
});
```

 🤙 🤙 🤙
