/**
 * Observer v0.1.0
 * Helpers Module
 * by Nathaniel Morales
 */

class Observer {
  OBSCollection = {}
  OBSElements = {}
  observeAll( parameters ) {
    parameters.forEach(param=> {
      this.observe(param)
    })
  }
  observe({ instructions, callback, element=null, options = {}}) { 
    const [key, event, type, target, parent ] = instructions.split(':')
    const root = document.querySelector(parent)
    const cb =  (entries) => entries.forEach((entry, i)=>callback(entry, i)) 
    let elements = []
    let opts = options
    let observer = null
    if(!opts['root'] && root) opts['root'] = root 
    if(element) elements.push(element)
    else if(type === 'one') elements.push(document.querySelector(target))
    else if(type === 'all') elements = document.querySelectorAll(target)  
    if(event === 'intersection') observer = new IntersectionObserver(cb, opts)
    if(event === 'mutation') observer = new MutationObserver(cb)
    if(event === 'resize') observer = new ResizeObserver(cb)
    if(observer) elements.forEach(el => { 
      if(event === 'intersection') observer.observe(el)
      if(event === 'mutation')  observer.observe(el, options)
      if(event === 'resize')  observer.observe(el)
    })
    if(key) this.OBSCollection[[key,event].join('')] = observer 
    if(key[0] === '_') this.OBSElements[[key,event].join('')] = elements
    return this;
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
} 
