import jsdom from "jsdom";
import fs from "fs";
import Setter from "#Setter/index"; 
import chai from "chai"

 const { assert } = chai

const { JSDOM } = jsdom;

const html = fs.readFileSync("./Dom/Setter.html", "utf8");
const dom = new JSDOM(html);

global.document = dom.window.document; 
const setter = new Setter()


describe("setter testing", () => {   
    it("should get all six element", () => {
        setter.setElement({
            instruction: 'test:all:.test',
            set: (el)=> { 
                el?.setAttribute('data-set', 'getme') 
                //@ts-ignore
                el?.textContent = 'update me'
            }
        }) 
      const elements = setter.getElement('test:_all:') as HTMLDivElement[] 
      assert.equal(elements.length, 6) 
    });
    it("should update text content in all 6 element", () => {
        const elements = setter.getElement('test:_all:') as HTMLDivElement[] 
        elements.forEach(el=>{  
            assert.equal(el.getAttribute('data-set'), "getme") 
            assert.equal(el.textContent, 'update me')
        })
    }); 
    it("should update the text content of the first element in the 6 element", () => {
        setter.setElement({
            instruction: 'test:_first:',
            set: el=> {
                //@ts-ignore
                el?.textContent = "first text"
            }
        })
        const firstElement = setter.getElement('test:_first:')[0]
        assert.equal(firstElement?.textContent, 'first text') 
    }); 
    it("should update the style of the last element in the 6 element", () => {
        setter.setStyle('test:_last:', {
            display: 'block'
        })
        const lastElement = setter.getElement('test:_last:')[0] as HTMLDivElement
        assert.equal(lastElement?.style.display, 'block') 
    }); 
  }); 