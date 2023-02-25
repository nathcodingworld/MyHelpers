class Listener {
  collections = {}
  listens(events) {
    events.forEach((event) => this.listen(event));
  } 
  listen({ target, callback, element, options = {}}) {   
    const [custom, event, type, selector] = target.split(":")  
    const registerItem = (item) => {
      if(custom[custom.length-1] === '_')  this.collections[custom] ? this.collections[custom].push(item) : this.collections[custom] = [item]
      else if(custom && !this.collections[custom]) this.collections[custom] = item
    }
    if(element && element instanceof HTMLElement ) { 
      element.addEventListener(event, callback, options) 
      registerItem(element)
    } else {
      let element = []
      if(type === 'all')  element = document.querySelectorAll(selector) 
      if(type === 'one') element.push(document.querySelector(selector))
      element.forEach((el) =>  {
        el.addEventListener(event, callback, options)
         registerItem(el)
      } )
    }  
    return this;
  }  
  trigerEvent(triger, detail) {
    const [elname, eventname] = triger.split(":")
    const [elitem, elind] = elname.split('_') 
    const event = new CustomEvent(eventname, {detail: detail})
    const cols = this.collections
    if(cols[elitem+'_'] && cols[elitem+'_'][Number(elind)]) cols[elitem+'_'][Number(elind)].dispatchEvent(event)
    else if(cols[elname]) cols[elname].dispatchEvent(event)
  }
} 
