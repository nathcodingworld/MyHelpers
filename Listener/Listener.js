class Listener {
  collections = {}
  listens(events) {
    events.forEach((event) => this.listen(event));
  }
  listen({ target, callback, options = {}}) {   
    const [custom, event, type, selector] = target.split(":") 

    switch (type) {
      case "all":
        const allElement = document.querySelectorAll(selector);
        if (allElement) allElement.forEach((el) =>  el.addEventListener(event, callback, options) ) 
        break;
      case "one":
        const element = document.querySelector(selector);
        if (element) {
          element.addEventListener(event, callback, options);
          if(custom) this.collections[custom] = element
        }
        break;
      case "id":
        const idelement = document.getElementById(selector);
        if (idelement) {
          idelement.addEventListener(event, callback, options);
          if(custom) this.collections[custom] = idelement
        }
        break;
      case "class":
          const clelement = document.getElementsByClassName(selector);
          if (clelement) clelement.forEach(el=> el.addEventListener(event, callback, options))
          break; 
      default:
        console.log("invalid Selector");
        break;
    }
    return this;
  }  
  trigerEvent(triger, detail) {
    const [elname, eventname] = triger.split(":")
    const event = new CustomEvent(eventname, {detail: detail})
    this.collections[elname].dispatchEvent(event)
  }
} 
