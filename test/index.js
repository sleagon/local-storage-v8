const { Enable, Disable, GetStorage } = require("../lib");
const should = require("chai").should();

function callback() {
    let store = GetStorage();
    return store;
}
function delay(seconds) {
    return new Promise((resolve, reject) =>
        setTimeout(resolve, seconds * 1000)
    );
}
describe("#local-storage-v8", function() {
    it("should get right local value for callback", function() {
        let store = GetStorage();
        store.version = "v1.0";
        setTimeout(() => {
            let version = GetStorage().version;
            version.should.equal(store.version);
        });
    });
    it("should get right local value for async function", function() {
        (async function() {
            let store = GetStorage();
            store.engine = "lts(v8.9)";
            await delay(2);
            setTimeout(() => {
                let engine = GetStorage().engine;
                engine.should.equal(store.engine);
            });
        })();
    });
});
