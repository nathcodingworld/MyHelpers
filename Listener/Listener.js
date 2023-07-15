/**
 * Listener v0.1.0
 * My Helpers
 * Nathaniel Morales
 */

class Listener {
  collections = {}
  callbacks= {}
  listens(events) {
    events.forEach((event) => this.listen(event));
    return this;
  } 
  listen({ instruction, callback, element,parent = undefined, options = {}}) {   
    const [key, event, type, target] = instruction.split(":")   
    const eventkey = [key, event].join('') 
    const parentDocument = parent || document
    let elements = [] 
    let finalcallback = callback
    let finalevent = event
    if(element && element instanceof HTMLElement ) elements.push(element)
    else if(type === 'all')  elements = parentDocument.querySelectorAll(target) 
    else if(type === 'one') elements.push(parentDocument.querySelector(target)) 
    else if(this.collections[key] && type === 'get') elements.push(...this.collections[key])
    if(!callback && this.callbacks[eventkey]) {finalcallback = this.callbacks[eventkey];finalevent = type}
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if(el) el.addEventListener(finalevent, finalcallback, options)  
    } 
    if(!key) return this;
    if(this.collections[key]) this.collections[key].push(...elements)
    else this.collections[key] = elements
    if(key[0] !== '_') return this 
    if(!this.callbacks[eventkey]) this.callbacks[eventkey] = callback
    return this;
  }  
  trigerEvents(trigers) {
    trigers.forEach(triger=> {
      this.trigerEvent(triger[0], triger[1], triger[2] || 0)
    })
    return this;
  }
  trigerEvent(triger, detail, elind = 0) {
    const [elname, eventname] = triger.split(":") 
    const event = new CustomEvent(eventname, {detail: detail})   
    if(!elname && !this.collections[elname]) return this;
    this.collections[elname][elind].dispatchEvent(event)  
    return this;
  }
  ignoreAll(details) {
    details.forEach(detail=> {
      this.ignore(detail[0], detail[1] || 0, detail[2] || false, detail[3] || false)
    })
  }
  ignore(detail, elind = 0, clearcb = false, clearel = false) {
    const [key, event] = detail.split(':')
    const eventkey = [key, event].join('')
    this.collections[key][elind].removeEventListener(event, this.callbacks[eventkey])
    if(clearcb) delete this.callbacks[eventkey]
    if(clearel) delete this.collections[key] 
  }
  changeEvent(keyevent, callback, options = {}) {
    const [ key, event ] = keyevent.split(':')
    const eventkey = [key, event].join('')
    this.collections[key].forEach(el=> {
      el.removeEventListener(event, this.callbacks[eventkey])
      el.addEventListener(event, callback, options)
    })
    this.callbacks[eventkey] = callback
    return this
  }
} 
