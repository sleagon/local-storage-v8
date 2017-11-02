const asyncHooks = require("async_hooks");
const fs = require("fs");
const util = require("util");

const map = new Map();

const hook = asyncHooks.createHook({
    init: (asyncId, type, trigger) => {
        type === "PROMISE" && map.set(trigger, map.get(trigger) || {});
        map.get(trigger) && map.set(asyncId, map.get(trigger));
    },
    destroy: asyncId => {
        map.get(asyncId) && map.delete(asyncId);
    }
});
hook.enable();

export const GetStorage = function(): localStorage.Storage {
    let k = asyncHooks.executionAsyncId();
    let t = asyncHooks.triggerAsyncId();
    return map.get(k) || (map.set(k, map.get(t) || {}) && map.get(k));
};

export declare namespace localStorage {
    interface Storage {
        [key: string]: any;
    }
    const Enable: () => void;
    const Disable: () => void;
    const GetStorage: () => Storage;
}
export const Enable = () => hook.enable();
export const Disable = () => hook.disable();

export default {
    Enable,
    Disable,
    GetStorage
};