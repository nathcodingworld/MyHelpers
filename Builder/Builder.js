/*!
 * Builder v0.2.0
 * My Helpers
 * Nathaniel Morales
 */
  
class Builder {
    customElement({style, template, script}) {  
        customElements.define(template.name, class extends template.element {
            constructor() {
                super()   
                for (let key in style) {
                    this.style[key] = style[key]
                }
                if(script && script.initial) script.initial(this) 
            } 
            connectedCallback() { if(script && script.onMount) script.onMount(this) }
            disconnectedCallback() { if(script && script.onDismount) script.onDismount(this) }
            adoptedCallback() {if(script && script.onMove) script.onMove(this) }
            static get observedAttributes() { return template.attributes } 
            attributeChangedCallback(name, oldValue, newValue) { if(script && script.onChangeAtt) script.onChangeAtt(name, oldValue, newValue, this) }
        }, {extends: template.type})
    }
    customComponent({style, template, script}) {
        const newElement = document.createElement('template')
        newElement.innerHTML = template.root   
        let styleTag = newElement.content.getElementById('pastehere')
        if(!styleTag) {styleTag = document.createElement('style');newElement.content.appendChild(styleTag)}
        class MyElement extends (template.element || HTMLElement) {
            constructor() {
                super()
                if(template.noshadow)  this.shadow = this.attachShadow({mode: 'closed'}) 
                else  this.shadow = this.attachShadow({mode: 'open'}) 
                if (!MyElement.initialized) {
                    if(style) for (const classname in style) {
                        if (Object.hasOwnProperty.call(style, classname)) {   
                            let classContent = addStyles (style[classname], '.'+classname) 
                            styleTag.textContent = `.${classname} {${classContent}}` + styleTag.textContent
                        }
                    }   
                    if(script.initial) script.initial(this)
                    MyElement.initialized = true;
                }  
                this.shadow.appendChild(newElement.content.cloneNode(true)) 
            } 
            connectedCallback() { if(script.onMount) script.onMount(this) }
            disconnectedCallback() { if(script.onDismount) script.onDismount(this) }
            adoptedCallback() {if(script.onMove) script.onMove(this) }
            static get observedAttributes() { return template.attributes } 
            attributeChangedCallback(name, oldatt, newatt) { if(script.onChangeAtt) script.onChangeAtt(this.shadow, name, oldatt, newatt) }
        } 
        function addStyles (stylesObject, parent = "") {
            let classContent = ''
            for (const key in stylesObject){
                if (Object.hasOwnProperty.call(stylesObject, key)) {
                    const styleproperty = stylesObject[key]
                    if(key[0] === ":" || key[0] === "&") { 
                        const combinedStyle = parent + key.replace('&', '') 
                        styleTag.textContent += `${combinedStyle} {${addStyles(styleproperty, combinedStyle)}}` 
                    } else if(key[0] === "@") { 
                        const mediaquery = key.replace('@', '')
                        const classcontent = addStyles(styleproperty)
                        const mediaclass = `@media screen and (max-width: ${mediaquery}) {${parent} {${classcontent}}}`
                        styleTag.textContent += mediaclass  
                    } else classContent += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${styleproperty};`
                }
            } 
            return classContent
        }
        MyElement.initialized  = false
        customElements.define(template.name, MyElement)
    } 
    register(extension, parameter = []) {
        parameter.forEach(param => {
            extension(this, param)
        })
        return this
    }
    registers(extensions) {
        extensions.forEach(ext=> this.register(ext.extension, ext.params || []))
        return this
    }
}


