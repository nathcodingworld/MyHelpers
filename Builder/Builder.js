/*!
 * Builder v0.1.0
 * Helpers Module
 * by Nathaniel Morales
 */
 

class Builder {
    createCustomElement({style, template, script, data}) {
        const newElement = document.createElement('template')
        newElement.innerHTML = '<style>'+style+'</style>' + template
        customElements.define(data.name, class extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({mode: 'open'}) 
                this.shadowRoot.appendChild(newElement.content.cloneNode(true)) 
                script.initial(this.shadowRoot, this) 
            } 
            connectedCallback() { if(script.onMount) script.onMount(this) }
            disconnectedCallback() { if(script.onDismount) script.onDismount(this) }
            adoptedCallback() {if(script.onMove) script.onMove(this) }
            static get observedAttributes() { return data.attributes } 
            attributeChangedCallback(name, oldValue, newValue) { if(script.onChangeAtt) script.onChangeAtt(name, oldValue, newValue, this) }
        })
    }
    createCustomElementtest({root, initial, name, obsAtt, onMount, onChangeAtt, onDismount, onMove}) {
        const newElement = document.createElement('template')
        newElement.innerHTML = root
        customElements.define(name, class extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({mode: 'open'}) 
                this.shadowRoot.appendChild(newElement.content.cloneNode(true)) 
                initial(this.shadowRoot, this)
            } 
            connectedCallback() { if(onMount) onMount(this) }
            disconnectedCallback() { if(onDismount) onDismount(this) }
            adoptedCallback() {if(onMove) onMove(this) }
            static get observedAttributes() { return obsAtt } 
            attributeChangedCallback() { if(onChangeAtt) onChangeAtt(this) }
        })
    }
}