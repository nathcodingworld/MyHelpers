import jsdom from "jsdom";
import fs from "fs";
import Listener from "#Listener/index";
import chai from "chai";

const { assert } = chai;

const { JSDOM } = jsdom;

const html = fs.readFileSync("./Dom/Listener.html", "utf8");
const dom = new JSDOM(html);

global.document = dom.window.document;
const listener = new Listener();

describe("updateText", () => {
  const updateBtn = document.getElementById("update");
  const trigerBtn = document.getElementById("here");
  listener.listens([{
      instruction: ":click:one:#update",
      callback: (e) => { 
        e.target.textContent = "Updated text";
      },
  },{
      instruction: "test:update:one:#update:",
      callback: (e) => {
        e.target.innerText = "Updated text";
      },
  },{
      instruction: ":click:one:#here:",
      callback: () => {
        listener.trigerEvent("test:update", {}, 0);
      },
  }]);

  it("should update text content on Click", () => {
    updateBtn?.click();
    assert.equal(updateBtn?.textContent, "Updated text");
  });

  it("should triger custom event", () => {
    trigerBtn?.click();
    assert.equal(updateBtn?.textContent, "Updated text");
  });
});
