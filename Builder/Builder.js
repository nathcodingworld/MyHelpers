
 

class Builder {
    createCustomElement({style, template, script, data}) {
        const newElement = document.createElement('template')
        newElement.innerHTML = '<style>'+style+'</style>' + template
        class customElement extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({mode: 'open'})
                this.shadowRoot?.appendChild(newElement.content.cloneNode(true)) 
                script.initial(this) 
            } 
            connectedCallback() { script.onMount(this) }
            disconnectedCallback() { script.onDismount(this) }
            static get observedAttributes() { return data.attributes } 
            attributeChangedCallback() { script.onChangeAtt(this) }
        }
        window.customElements.define(data.name, customElement)
    }
}