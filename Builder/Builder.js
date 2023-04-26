/*!
 * Builder v0.1.0
 * My Helpers
 * Nathaniel Morales
 */
 

class Builder {
    customizeElement({style, template, script}) { 
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
    buildCustomElement({style, template, script}) { 
        customElements.define(template.name, class extends HTMLElement {
            constructor() {
                super() 
                for (let key in style) {
                    this.style[key] = style[key]
                }
                if(script && script.initial) script.initial(this) 
            } 
            connectedCallback() { if( script && script.onMount) script.onMount(this) }
            disconnectedCallback() { if(script && script.onDismount) script.onDismount(this) }
            adoptedCallback() {if(script && script.onMove) script.onMove(this) }
            static get observedAttributes() { return template.attributes } 
            attributeChangedCallback(name, oldValue, newValue) { if(script && script.onChangeAtt) script.onChangeAtt(name, oldValue, newValue, this) }
        } )
    }
    buildCustomComponent({root, initial, name, obsAtt, onMount, onChangeAtt, onDismount, onMove, noshadow = true}) {
        const newElement = document.createElement('template')
        newElement.innerHTML = root
        customElements.define(name, class extends HTMLElement {
            constructor() {
                super()
                if(noshadow)  this.shadow = this.attachShadow({mode: 'closed'}) 
                else  this.shadow = this.attachShadow({mode: 'open'})  
                this.shadow.appendChild(newElement.content.cloneNode(true)) 
                if(initial)initial(this.shadow, this)
            } 
            connectedCallback() { if(onMount) onMount(this.shadow, this) }
            disconnectedCallback() { if(onDismount) onDismount(this) }
            adoptedCallback() {if(onMove) onMove(this) }
            static get observedAttributes() { return obsAtt } 
            attributeChangedCallback(name, oldatt, newatt) { if(onChangeAtt) onChangeAtt(this.shadow, name, oldatt, newatt) }
        })
    } 
}


