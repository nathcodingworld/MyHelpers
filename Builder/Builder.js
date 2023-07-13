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
        const styleTag = document.createElement('style')
        customElements.define(template.name, class extends (template.element || HTMLElement) {
            constructor() {
                super()
                if(template.noshadow)  this.shadow = this.attachShadow({mode: 'closed'}) 
                else  this.shadow = this.attachShadow({mode: 'open'})   
                if(style) for (const classname in style) {
                    if (Object.hasOwnProperty.call(style, classname)) {   
                        let classContent = addStyles (style[classname], '.'+classname)
                        const classTitle = `.${classname} {${classContent}}` 
                        styleTag.textContent += classTitle
                    }
                }  
                newElement.innerHTML = styleTag.outerHTML + template.root   
                this.shadow.appendChild(newElement.content.cloneNode(true)) 
                if(script.initial)script.initial(this.shadow, this)
            } 
            connectedCallback() { if(script.onMount) script.onMount(this.shadow, this) }
            disconnectedCallback() { if(script.onDismount) script.onDismount(this) }
            adoptedCallback() {if(script.onMove) script.onMove(this) }
            static get observedAttributes() { return template.attributes } 
            attributeChangedCallback(name, oldatt, newatt) { if(script.onChangeAtt) script.onChangeAtt(this.shadow, name, oldatt, newatt) }
        })
        function addStyles (stylesObject, parent = "") {
            let classContent = ''
            for (const styleProps in stylesObject){
                if (Object.hasOwnProperty.call(stylesObject, styleProps)) {
                    if(styleProps[0] === ":" || styleProps[0] === "&") { 
                        const combinedStyle = parent + styleProps.replace('&', '')
                        styleTag.textContent += `${combinedStyle} {${addStyles(stylesObject[styleProps], combinedStyle)}}` 
                    }
                    else classContent += `${styleProps.replace(/([A-Z])/g, '-$1').toLowerCase()}:${stylesObject[styleProps]};` 
                }
            } 
            return classContent
        }
    } 
    register(extension, parameter = []) {
        parameter.forEach(param => {
            extension(this, param)
        })
        return this
    }

}


