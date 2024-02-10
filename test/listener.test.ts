import jsdom from "jsdom";
import fs from "fs";
import Listener from "#Listener/index"; 
import chai from "chai"

 const {assert} = chai

const { JSDOM } = jsdom;

const html = fs.readFileSync("./Dom/Listener.html", "utf8");
const dom = new JSDOM(html);

global.document = dom.window.document;
const listener = new Listener();

describe("updateText", () => {
  const updateBtn = document.getElementById("update");
  const trigerBtn = document.getElementById("here")
//   const targetelement = document.getElementById("target")
 
  it("should update text content", () => {
    listener.listen({
      instruction: ":click:one:#update",
      callback: (e) => {
        e.target.innerText = "Updated text";
      },
    });

    updateBtn?.click();
    assert.equal(updateBtn?.innerText, "Updated text")
  });

  it("should triger custom event", () => {
    listener.listens([ { 
        instruction: "test:update:one:#update:",
        callback: (e) => { 
            e.target.innerText = 'Updated text'
        },
    },{ 
        instruction: ":click:one:#here:",
        callback: () => { 
            listener.trigerEvent("test:update",{},0)
        },
    }]);
    trigerBtn?.click()
    assert.equal(updateBtn?.innerText, "Updated text") 
  });
});
