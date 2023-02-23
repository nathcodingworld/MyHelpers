/*!
 * Builder v0.1.0
 * Helpers Module
 * by Nathaniel Morales
 */
 

class Builder { 
    createCustomElement({root, initial, name, obsAtt, onMount, onChangeAtt, onDismount, onMove}) {
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