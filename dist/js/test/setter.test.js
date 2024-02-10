"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = __importDefault(require("jsdom"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("#Setter/index"));
const chai_1 = __importDefault(require("chai"));
const { assert } = chai_1.default;
const { JSDOM } = jsdom_1.default;
const html = fs_1.default.readFileSync("./Dom/Setter.html", "utf8");
const dom = new JSDOM(html);
global.document = dom.window.document;
const setter = new index_1.default();
describe("setter testing", () => {
    it("should get all six element", () => {
        setter.setElement({
            instruction: 'test:all:.test',
            set: (el) => {
                el === null || el === void 0 ? void 0 : el.setAttribute('data-set', 'getme');
                //@ts-ignore
                el === null || el === void 0 ? void 0 : el.textContent = 'update me';
            }
        });
        const elements = setter.getElement('test:_all:');
        assert.equal(elements.length, 6);
    });
    it("should update text content in all 6 element", () => {
        const elements = setter.getElement('test:_all:');
        elements.forEach(el => {
            assert.equal(el.getAttribute('data-set'), "getme");
            assert.equal(el.textContent, 'update me');
        });
    });
    it("should update the text content of the first element in the 6 element", () => {
        setter.setElement({
            instruction: 'test:_first:',
            set: el => {
                //@ts-ignore
                el === null || el === void 0 ? void 0 : el.textContent = "first text";
            }
        });
        const firstElement = setter.getElement('test:_first:')[0];
        assert.equal(firstElement === null || firstElement === void 0 ? void 0 : firstElement.textContent, 'first text');
    });
    it("should update the style of the last element in the 6 element", () => {
        setter.setStyle('test:_last:', {
            display: 'block'
        });
        const lastElement = setter.getElement('test:_last:')[0];
        assert.equal(lastElement === null || lastElement === void 0 ? void 0 : lastElement.style.display, 'block');
    });
});
