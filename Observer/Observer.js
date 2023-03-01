/**
 * Observer v0.1.0
 * Helpers Module
 * by Nathaniel Morales
 */

class Observer {
  OBSCollection = {}
  OBSElements = {}
  _createObserver(type, callback, elements, options={}, parent=null) {
    const cb =  (entries) => entries.forEach((entry)=>callback(entry)) 
    let root = document.querySelector(parent) 
    let opts = options
    let observer = null
    if(!opts['root'] && parent && root) opts['root'] = root  
    if(type === 'intersection') observer =  new IntersectionObserver(cb, opts)
    if(type === 'mutation') observer =  new MutationObserver(cb)
    if(type === 'resize') observer =  new ResizeObserver(cb) 
    if(observer) for (let i = 0; i < elements.length; ++i ) {
      if(type === 'mutation')  observer.observe(elements[i], options)  
      else observer.observe(elements[i])
    } 
    return observer
  } 
  observeAll( parameters ) {
    parameters.forEach(param=> {
      this.observe(param)
    })
  }
  observe({ instructions, callback, element=null, options = {}}) { 
    const [key, event, type, target, parent ] = instructions.split(':') 
    let elements = [] 
    let observer = null
    if(event !== 'intersection' && event !== 'mutation' && event !== 'resize') return this 
    if(element) elements.push(element)
    else if(type === 'one') elements.push(document.querySelector(target))
    else if(type === 'all') elements = document.querySelectorAll(target)  
    observer = this._createObserver(event, callback, elements, options, parent)
    if(!key && !observer) return this
    this.OBSCollection[[key,event].join('')] = observer 
    if(key[0] === '_') this.OBSElements[[key,event].join('')] = elements
    return this;
  } 
  disregards(observe) {
    for (let i = 0; i < observe.length; ++i ) { 
      const {instructions, index , element , reset } = observe[i]
      this.disregard({instructions, index , element , reset })
    }  
  }
  disregard({instructions, index=undefined, element=null, reset= undefined}) { 
    const [key, event, type] = instructions.split(':') 
    const eventkey = [key, event].join('')
    const elements = this.OBSElements[eventkey]
    if(!this.OBSCollection[eventkey]) return this
    if(type === 'del')  this.OBSCollection[eventkey].disconnect()  
    if(reset && elements && type === 'del') for (let i = 0; i < elements.length; i++)  reset(elements[i]) 
    else if(event === 'mutation' || !elements) return this
    else if(element) this.OBSCollection[eventkey].unobserve(element) 
    else if(typeof index === 'number') this.OBSCollection[eventkey].unobserve(elements[index])
  }
  reObserve(instructions, reset, callback, options={}) { 
    const [key, event, parent] = instructions.split(':')
    const keyevent = [key,event].join('')
    const elements = this.OBSElements[keyevent]
    const observer = this.OBSCollection[keyevent] 
    if(!elements && !observer) return this 
    for (let i = 0; i < elements.length; i++) reset(elements[i])
    observer.disconnect()  
    const newObserver = this._createObserver(event, callback, elements, options, parent)
    if(newObserver) this.OBSCollection[keyevent] = newObserver 
    return this 
  } 
} 
