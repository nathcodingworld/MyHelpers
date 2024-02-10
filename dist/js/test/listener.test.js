"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = __importDefault(require("jsdom"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("#Listener/index"));
const chai_1 = __importDefault(require("chai"));
const { assert } = chai_1.default;
const { JSDOM } = jsdom_1.default;
const html = fs_1.default.readFileSync("./Dom/Listener.html", "utf8");
const dom = new JSDOM(html);
global.document = dom.window.document;
const listener = new index_1.default();
describe("updateText", () => {
    const updateBtn = document.getElementById("update");
    const trigerBtn = document.getElementById("here");
    listener.listens([{
            instruction: ":click:one:#update",
            callback: (e) => {
                e.target.textContent = "Updated text";
            },
        }, {
            instruction: "test:update:one:#update:",
            callback: (e) => {
                e.target.innerText = "Updated text";
            },
        }, {
            instruction: ":click:one:#here:",
            callback: () => {
                listener.trigerEvent("test:update", {}, 0);
            },
        }]);
    it("should update text content on Click", () => {
        updateBtn === null || updateBtn === void 0 ? void 0 : updateBtn.click();
        assert.equal(updateBtn === null || updateBtn === void 0 ? void 0 : updateBtn.textContent, "Updated text");
    });
    it("should triger custom event", () => {
        trigerBtn === null || trigerBtn === void 0 ? void 0 : trigerBtn.click();
        assert.equal(updateBtn === null || updateBtn === void 0 ? void 0 : updateBtn.textContent, "Updated text");
    });
});
