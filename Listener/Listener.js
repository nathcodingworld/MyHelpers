class Listener {
  collections = {}
  listens(events) {
    events.forEach((event) => this.listen(event));
    return this;
  } 
  listen({ target, callback, element, options = {}}) {   
    const [custom, event, type, selector] = target.split(":")   
    let elements = []
    if(element && element instanceof HTMLElement ) elements.push(element)
    else if(type === 'all')  elements = document.querySelectorAll(selector) 
    else if(type === 'one') elements.push(document.querySelector(selector)) 
    elements.forEach((el) => {
      if(el) el.addEventListener(event, callback, options)
      if(!custom) return 
      if(custom[0] !== '_' && !this.collections[custom])  this.collections[custom] = el 
      if(custom[0] !== '_') return
      if(this.collections[custom]) this.collections[custom].push(el) 
      else this.collections[custom] = [el] 
    })
    return this;
  }  
  trigerEvents(trigers) {
    trigers.forEach(triger=> {
      this.trigerEvent(triger[0], triger[1])
    })
    return this;
  }
  trigerEvent(triger, detail) {
    const [elname, eventname] = triger.split(":")
    const [elitem, elind] = elname.split('_') 
    const event = new CustomEvent(eventname, {detail: detail})  
    if(!elname) return this;
    if(this.collections[elname]) this.collections[elname].dispatchEvent(event)
    else if(!this.collections['_'+elitem]) return this;
    else if(!elind)  this.collections['_'+elitem].forEach(el=>el.dispatchEvent(event)) 
    else if(this.collections['_'+elitem][Number(elind)]) this.collections['_'+elitem][Number(elind)].dispatchEvent(event)
    return this;
  }
} 
