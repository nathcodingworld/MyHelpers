"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Listener {
    constructor() {
        this.collections = {};
        this.callbacks = {};
    }
    listens(events) {
        events.forEach((event) => this.listen(event));
        return this;
    }
    listen({ instruction, callback, element, parent = undefined, options = {} }) {
        const [key, event, type, target] = instruction.split(":");
        const eventkey = [key, event].join('');
        const parentDocument = parent || document;
        let elements = [];
        let finalcallback = callback;
        let finalevent = event;
        if (element && element instanceof HTMLElement)
            elements.push(element);
        else if (type === 'all')
            elements = Array.from(parentDocument.querySelectorAll(target));
        else if (type === 'one')
            elements.push(parentDocument.querySelector(target));
        else if (this.collections[key] && type === 'get')
            elements.push(...this.collections[key]);
        if (!callback && this.callbacks[eventkey]) {
            finalcallback = this.callbacks[eventkey];
            finalevent = type;
        }
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el)
                el.addEventListener(finalevent, finalcallback, options);
        }
        if (!key)
            return this;
        if (this.collections[key])
            this.collections[key].push(...elements);
        else
            this.collections[key] = elements;
        if (key[0] !== '_')
            return this;
        if (!this.callbacks[eventkey])
            this.callbacks[eventkey] = callback;
        return this;
    }
    trigerEvents(trigers) {
        trigers.forEach(triger => {
            this.trigerEvent(triger[0], triger[1], triger[2] || 0);
        });
        return this;
    }
    trigerEvent(triger, detail, index) {
        var _a;
        const [elname, eventname] = triger.split(":");
        const event = new CustomEvent(eventname, { detail: detail });
        if (!elname && !this.collections[elname])
            return this;
        if (index !== undefined)
            (_a = this.collections[elname][index]) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
        else
            this.collections[elname].forEach(el => el === null || el === void 0 ? void 0 : el.dispatchEvent(event));
        return this;
    }
    ignoreAll(details) {
        details.forEach(detail => {
            this.ignore(detail[0], detail[1] || 0, detail[2] || false, detail[3] || false);
        });
    }
    ignore(detail, elind, clearcb, clearel) {
        var _a;
        const [key, event] = detail.split(':');
        const eventkey = [key, event].join('');
        if (elind !== undefined)
            (_a = this.collections[key][elind]) === null || _a === void 0 ? void 0 : _a.removeEventListener(event, this.callbacks[eventkey]);
        else
            this.collections[key].forEach(el => el === null || el === void 0 ? void 0 : el.removeEventListener(event, this.callbacks[eventkey]));
        if (clearcb)
            delete this.callbacks[eventkey];
        if (clearel)
            delete this.collections[key];
    }
    changeEvent(keyevent, callback, options) {
        const [key, event] = keyevent.split(':');
        const eventkey = [key, event].join('');
        this.collections[key].forEach(el => {
            el === null || el === void 0 ? void 0 : el.removeEventListener(event, this.callbacks[eventkey]);
            el === null || el === void 0 ? void 0 : el.addEventListener(event, callback, options);
        });
        this.callbacks[eventkey] = callback;
        return this;
    }
}
exports.default = Listener;
