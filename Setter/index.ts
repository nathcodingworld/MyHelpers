 
type breakpointsType = {
  xxl:number
  xl:number
  lg:number
  md:number
  sm:number
}
type PartialCSSStyleDeclaration = {
  [K in keyof CSSStyleDeclaration]?: string;
};
type elementsType = (Element | null)[]
type DisplayPropsValue = 'block' | 'inline' | 'flex' | 'none' | 'grid' | 'toggle'
type DisplayAction = 'switch' | 'toggle'
type getTypeType = 'all'|'first'|'last'
type setFnType = (el:Element|null) => void
type getInstructionType = getTypeType|`_${getTypeType}`
type breakpoints = keyof breakpointsType
type filterType = 'min'|'max'|'around'|'between'
type registrationInstructionType = `${string}:${string}`
type getElementInstructionType = `${string}:${getInstructionType}:${string}`
type toggleInstructionType = `${DisplayPropsValue}:${getElementInstructionType}`
type toggleClassInstructionType = `${DisplayAction}:${string}:${string}:${getElementInstructionType}`
type queryInstructionType = {
  instruction: `${filterType}:${breakpoints}`|`${filterType}:${breakpoints}:${breakpoints}:${breakpoints}`
  run: () => void
}
type setElementInstructionType = {
  instruction: getElementInstructionType
  set: setFnType
  element?:Element
}

interface SetterType {
  media: breakpointsType
  elementCollection: Record<string,  elementsType>
  fnCollection: Record<string, setFnType>
  stylesCollection:Record<string,PartialCSSStyleDeclaration>
  setMediaQueries:(args: breakpointsType)=>void
  registerElements: (args: registrationInstructionType) => void
  mediaQueries: (args: queryInstructionType[]) => void
  mediaQuery: (args:queryInstructionType) => this
  toggleDisplay:(instruction:toggleInstructionType, el?: HTMLElement) => this
  toggleClass:(instruction:toggleClassInstructionType, el?: HTMLElement) => this
  getElement:(instruction:getElementInstructionType, parent: Element | null) => elementsType
  setElement:(args:setElementInstructionType) => this
  setStyle:(instruction:getElementInstructionType, styles:PartialCSSStyleDeclaration, parent?:HTMLElement) => void
}


export default class Setter implements SetterType {
    media = { xxl: 1400, xl: 1200, lg: 992, md: 768, sm: 576 } 
    elementCollection:Record<string, elementsType> = {}
    fnCollection: Record<string, setFnType> = {}
    stylesCollection:Record<string,PartialCSSStyleDeclaration> = {}
    setMediaQueries({ xxl, xl, lg, md, sm }: breakpointsType) {
      this.media = { xxl, xl, lg, md, sm }
    }
    registerElements(instruction:registrationInstructionType) {
      const [key, selector] = instruction.split(":") as [string, string]
      const elements = document.querySelectorAll(selector) 
      if(key && elements.length !== 0) this.elementCollection[key] = Array.from(elements)
    }
    mediaQueries(queries: queryInstructionType[]) {
      queries.forEach((query) => this.mediaQuery(query));
    }
    mediaQuery({ instruction, run }:queryInstructionType) {
      const [filter, mq, min, max] = instruction.split(":") as [filterType,breakpoints,breakpoints,breakpoints]
      const windowWidth = window.innerWidth;  
      if(mq && filter === 'min' && windowWidth >= this.media[mq]) run()
      else if(mq && filter === 'max' && windowWidth < this.media[mq]) run()
      else if(min && max && filter === 'between' && windowWidth >= this.media[min] && windowWidth < this.media[max]) run()
      else if(min && max && filter === 'around' && windowWidth < this.media[min] || windowWidth >= this.media[max]) run() 
      return this;
    } 
    toggleDisplay(instruction:toggleInstructionType, el?: HTMLElement) { 
      const [display, key, type, selector] = instruction.split(":") as [DisplayPropsValue, string, getInstructionType, string]  
      const elements = this.getElement([key,type,selector].join(':') as getElementInstructionType)  
      const setdisplay = (element:HTMLElement) => {
        if(!element) return this
        if (display === "toggle") {
          if (element.style.display != "none") element.style.display = "none";
          else element.style.display = "block";
        } else element.style.display = display;
      }
      if(el) setdisplay(el)
      else for (const element of elements)  setdisplay(element as HTMLElement) 
      return this
    }
    toggleClass(instruction:toggleClassInstructionType, el?: HTMLElement) {
      const [action, current, change, key, type, selector] = instruction.split(":")  
      const elements = this.getElement([key,type,selector].join(':') as getElementInstructionType)  
      const setclass = (element: HTMLElement) => {
        if(!element) return this
        if (action === "toggle") {
          if (element.classList.contains(current)) {
            element.classList.remove(current);
            element.classList.add(change);
          } else { element.classList.remove(change);
            element.classList.add(current); }
        } else { 
          element.classList.remove(current);
          element.classList.add(change); 
        }
      }
      if(el) setclass(el)
      else for (const element of elements)  setclass(element as HTMLElement) 
      return this
    }
    getElement(instruction:getElementInstructionType, parent: Element | null = null) {
      const [key, type, selector] = instruction.split(":") as [string, getInstructionType, string] 
      const targetDocument = parent || document 
      const elements = selector ? targetDocument.querySelectorAll(selector || '') : undefined 
      let items: elementsType = [] 
      if(elements && elements.length > 0){
        if(type === 'all')  items = Array.from(elements)
        else if(type === 'first')  items.push(elements.item(0))
        else if(type === 'last')  items.push(elements.item(elements.length-1))
      } 
      if(key && type[0] !== '_') this.elementCollection[key] = items
      const collections = this.elementCollection[key] 
      if(!collections || collections.length === 0) return items
      else if(type === '_all')  items = collections 
      else if(type === '_first') items.push(collections[0]) 
      else if(type === '_last') items.push(collections[collections.length-1]) 
      return items
    }
    setElement({ instruction, set, element=undefined }:setElementInstructionType) {
      const key = instruction.split(":")[0]
      let elements = this.getElement(instruction, element) 
      for (let i = 0; i < elements.length; i++)  if(elements[i]) set(elements[i]) 
      if(!key) return this  
      if(key[0] === '_') this.fnCollection[key] = set
      return this;
    } 
    setStyle(instruction:getElementInstructionType, styles:PartialCSSStyleDeclaration, parent?:HTMLElement) {
      const keys = instruction.split(":")[0]
      const elements = this.getElement(instruction, parent)
      //@ts-ignore
      for (const element of elements) for (const key in styles) if(element) element.style[key] = styles[key]
      if(!keys) return this  
      if(keys[0] === '_') this.stylesCollection[keys] = styles
    } 
  }
  

