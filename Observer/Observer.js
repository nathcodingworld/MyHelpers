/**
 * Observer v0.1.0
 * Helpers Module
 * by Nathaniel Morales
 */

class Observer {
  OBSCollection = {}
  OBSElements = {}
  _createObserver(type, callback, elements, options={}, parent=null) {
    const cb =  (entries) => entries.forEach((entry, i)=>callback(entry, i)) 
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
      this.disregard(observe[i][0], observe[i][1] || {ind:0, element:null})
    }  
  }
  disregard(instructions, opts = {ind:0, element:null}) {
    const {ind, element} = opts
    const [key, event, type, target] = instructions.split(':')
    const selected = document.querySelectorAll(target)
    const eventkey = [key, event].join('')
    if(this.OBSCollection[eventkey]) return this
    if(type === 'del') this.OBSCollection[eventkey].disconnect()
    else if(event === 'mutation' || !this.OBSElements[eventkey]) return this
    else if(element) this.OBSCollection[eventkey].unobserve(element)
    else if(type === 'all') selected.forEach(el =>  {if(el) this.OBSCollection[eventkey].unobserve(el)}) 
    else this.OBSCollection[eventkey].unobserve(this.OBSElements[eventkey][ind])
  }
  reObserve(target, callback, options={}) { 
    const [key, event, parent] = target.split(':')
    const keyevent = [key,event].join('')
    const elements = this.OBSElements[keyevent]
    const observer = this.OBSCollection[keyevent] 
    if(!elements && !observer) return this
    const newObserver = this._createObserver(event, callback, elements, options, parent)
    if(newObserver) observer.disconnect() 
    return this 
  }
  getReport(type, ind) {
    const observer = this.OBSCollection[type]
    let records = observer.takeRecords()
    if(records?.[ind]) return records[ind]
    return null
  }
} 
