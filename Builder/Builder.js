/*!
 * Builder v0.1.0
 * Helpers Module
 * by Nathaniel Morales
 */
 

class Builder {
    customizeElement({style, template, script}) { 
        customElements.define(template.name, class extends template.element {
            constructor() {
                super() 
                for (let key in style) {
                    this.style[key] = style[key]
                }
                script.initial(this) 
            } 
            connectedCallback() { if(script.onMount) script.onMount(this) }
            disconnectedCallback() { if(script.onDismount) script.onDismount(this) }
            adoptedCallback() {if(script.onMove) script.onMove(this) }
            static get observedAttributes() { return template.attributes } 
            attributeChangedCallback(name, oldValue, newValue) { if(script.onChangeAtt) script.onChangeAtt(name, oldValue, newValue, this) }
        }, {extends: template.type})
    }
    buildCustomElement({style, template, script}) { 
        customElements.define(template.name, class extends HTMLElement {
            constructor() {
                super() 
                for (let key in style) {
                    this.style[key] = style[key]
                }
                script.initial(this) 
            } 
            connectedCallback() { if(script.onMount) script.onMount(this) }
            disconnectedCallback() { if(script.onDismount) script.onDismount(this) }
            adoptedCallback() {if(script.onMove) script.onMove(this) }
            static get observedAttributes() { return template.attributes } 
            attributeChangedCallback(name, oldValue, newValue) { if(script.onChangeAtt) script.onChangeAtt(name, oldValue, newValue, this) }
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
                initial(this.shadow, this)
            } 
            connectedCallback() { if(onMount) onMount(this.shadow, this) }
            disconnectedCallback() { if(onDismount) onDismount(this) }
            adoptedCallback() {if(onMove) onMove(this) }
            static get observedAttributes() { return obsAtt } 
            attributeChangedCallback() { if(onChangeAtt) onChangeAtt(this) }
        })
    }
    registerAccordion({name, wrapperstyle={}, headstyle={}, panelstyle={}, noshadow = true}) {
        this.buildCustomElement({ 
            style: { 
                display: 'block',
                ...wrapperstyle
            }, 
            template: {
                name: name+'-accordion',
                attributes:  [] 
            },
            script: {
                initial: (root)=> console.log("init", root),
                onMount: (root)=> console.log("mount", root),
            }
        })
        this.buildCustomComponent({
            noshadow: noshadow,
            name: name+'-accordion-item',
            root: `
            <style>
                .accordion {
                    background-color: grey;
                    color: white;
                    cursor: pointer;
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 21px;
                    padding: 18px;
                    width: 100%;
                    text-align: left;
                    border: none;
                    outline: none;
                    transition: 0.4s;
                    margin: 10px 0;
                }
                .accordion:after {
                    content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDE0IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03IDdMMC45Mzc4MjIgMC4yNUwxMy4wNjIyIDAuMjUwMDAxTDcgN1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=);  
                    font-size: 13px;
                    color: #777;
                    float: right;
                    margin-left: 5px;
                    color:black;
                } 
                .clicked:after {
                    content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDE0IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03IDBMMTMuMDYyMiA2Ljc1TDAuOTM3ODIyIDYuNzVMNyAwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==); 
                    color:black;
                }
                .clicked, .accordion:hover {
                    background-color: red;
                    color: white;
                } 
                .panel {
                    padding: 0 18px;
                    background-color: white;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.2s ease-out;
                }
            </style> 
            <div>
                <button class="accordion"></button>
                <div class="panel">
                    <slot />
                </div>
            </div>
            `, 
            initial: (shadow, element) => { 
                shadow.querySelector('button').innerText = element.getAttribute('head-title'); 
                const button = shadow.querySelector('button')
                const panel = shadow.querySelector('.panel')
                if(headstyle) for (let key in headstyle) {
                    button.style[key] = headstyle[key]
                }
                if(panelstyle) for (let key in panelstyle) {
                    panel.style[key] = panelstyle[key]
                }
            }, 
            onMount: (shadow, element) => {
                let showInfo = false
                const button = shadow.querySelector('button')
                const panel = shadow.querySelector('.panel')
                button.addEventListener('click', () => {
                    showInfo = !showInfo;
                    if(showInfo) {
                        button.classList.add('clicked')
                        panel.style.maxHeight = panel.scrollHeight + "px"; 
                    } else {
                        button.classList.remove('clicked')
                        panel.style.maxHeight = null;  
                    }
                }); 
            }, 
            onDismount: (element) => {
                element.shadowRoot.querySelector('button').removeEventListener();
            } , 
        })
    }
}


