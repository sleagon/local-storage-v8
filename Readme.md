# local-storage-v8

> This package is based on [asyn_hooks][1] which is added in node 8.1, make sure your node is >=8.1.

## Install

```javascript
npm install local-storage-v8 --save
```

## Test

```javascript
npm test
```
## Usage

```javascript
// import
import { Enable, Disable, GetStorage } from "local-storage-v8";

// or require
const { Enable, Disable, GetStorage } = require("local-storage-v8");
```

Considering local storage is mostly used in web applications,here is a simple example for koa2. The source code is here, you can also clone it from the [repository][2].

```javascript
// say.js
module.exports = function(){
    const store = require("local-storage-v8").GetStorage();
    return store.name;
}
// server.js
const Koa = require("koa");
const app = new Koa();
const { GetStorage } = require("local-storage-v8");
const say = require("./say");
const asyncHooks = require("async_hooks");

const delay = seconds =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });

app
    .use(async (ctx, next) => {
        let store = GetStorage();
        store.name = ctx.query.name;
        await delay(Math.random() * 10 | 0);
        next();
    })
    .use((ctx, next) => {
        ctx.body = `hello, ${say()}.`;// you see, no need for ctx or req here.
    });

app.listen(9922);

// client.js
let rp = require("request-promise");

(function(){
    for(let k = 0; k < 10; k++){
        rp.get(`http://127.0.0.1:9922?name=${k}th`).then(data => {
            if(data !== `hello, ${k}th.`){
                throw new Error("Check failed!");
            } else {
                console.log(`${k}th done.`);
            }
        });
    }
})();
```

## Dependency
The source code, which is written in Typescript, is less than 40 lines, and no extra package needed. This package is highly inspired by another similar package called [async-local-storage][3] in npmjs, where we need modify or get the value through set or get. Feel free to modify the source code.






[1]: https://nodejs.org/dist/latest-v8.x/docs/api/async_hooks.html#async_hooks_async_hooks_createhook_callbacks
[2]: https://github.com/sleagon/local-storage-expamle
[3]: https://www.npmjs.com/package/async-local-storage