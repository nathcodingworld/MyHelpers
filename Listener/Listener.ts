

type listentypeType =  'one' | 'all' | 'get' | ''
type listenEventType = keyof HTMLElementEventMap | string
type callbackType = (e: Event|any) => void
type ElementsType = (Element | null)[] 
type listenType = {
  instruction: `${string}:${listenEventType}:${listentypeType}:${string}` 
  callback: callbackType, 
  element?: Element | null,
  parent?: Element | null, 
  options?: AddEventListenerOptions 
}

type triggerType = `${string}:${listenEventType}`
 
// const a = document.querySelectorAll('') 
interface ListenerType {
  collections: Record<string, ElementsType>
  callbacks: Record<string, callbackType>
  listens: (events: listenType[]) => this
  listen: (events: listenType) => this
  trigerEvents: (events: [triggerType, any, number|undefined][]) => this
  trigerEvent: <T>(trigger: triggerType, detail: T, index?: number) => this
  ignoreAll: (details: [triggerType,number|undefined, boolean|undefined, boolean|undefined][]) => void
  ignore: (detail:triggerType, elind?:number, clearcb?:boolean, clearel?:boolean) => void
  changeEvent: (keyevent:triggerType, callback:callbackType, options:AddEventListenerOptions) => void
}

class Listener implements ListenerType {
  collections:Record<string, ElementsType> = {}
  callbacks: Record<string, callbackType> = {}
  listens(events: listenType[]) {
    events.forEach((event) => this.listen(event));
    return this;
  } 
  listen({ instruction, callback, element, parent = undefined, options = {}}: listenType) {   
    const [key, event, type, target] = instruction.split(":") as [string, listenEventType, listentypeType, string] 
    const eventkey = [key, event].join('') 
    const parentDocument = parent || document
    let elements:ElementsType = [] 
    let finalcallback = callback
    let finalevent = event
    if(element && element instanceof HTMLElement ) elements.push(element)
    else if(type === 'all')  elements = Array.from(parentDocument.querySelectorAll(target))
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
  trigerEvents(trigers: [triggerType, any, number|undefined][]) {
    trigers.forEach(triger=> {
      this.trigerEvent(triger[0], triger[1], triger[2] || 0)
    })
    return this;
  }
  trigerEvent<T>(triger: triggerType, detail: T, index?: number) {
    const [elname, eventname] = triger.split(":") 
    const event = new CustomEvent(eventname, {detail: detail})   
    if(!elname && !this.collections[elname]) return this;
    if(index !== undefined) this.collections[elname][index]?.dispatchEvent(event)
    else this.collections[elname].forEach(el=>el?.dispatchEvent(event))
    return this;
  }
  ignoreAll(details: [triggerType, number|undefined, boolean|undefined, boolean|undefined][]) {
    details.forEach(detail=> {
      this.ignore(detail[0], detail[1] || 0, detail[2] || false, detail[3] || false)
    })
  }
  ignore(detail:triggerType, elind?:number, clearcb?:boolean, clearel?:boolean) {
    const [key, event] = detail.split(':')
    const eventkey = [key, event].join('')
    if(elind !== undefined) this.collections[key][elind]?.removeEventListener(event, this.callbacks[eventkey])
    else this.collections[key].forEach(el=> el?.removeEventListener(event, this.callbacks[eventkey]))
    if(clearcb) delete this.callbacks[eventkey]
    if(clearel) delete this.collections[key] 
  }
  changeEvent(keyevent:triggerType, callback:callbackType, options:AddEventListenerOptions) {
    const [ key, event ] = keyevent.split(':')
    const eventkey = [key, event].join('')
    this.collections[key].forEach(el=> {
      el?.removeEventListener(event, this.callbacks[eventkey])
      el?.addEventListener(event, callback, options)
    })
    this.callbacks[eventkey] = callback
    return this
  }
} 


export default Listener