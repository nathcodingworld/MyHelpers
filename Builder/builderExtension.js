

class BuilderExtemsion extends Builder {
    registerAccordion({name, wrapperstyle={}, headstyle={}, panelstyle={}, noshadow = true}) {
        this.buildCustomElement({ 
            style: { 
                display: 'block',
                ...wrapperstyle
            }, 
            template: {
                name: name+'-accordion',
                attributes:  [] 
            }
        })
        this.buildCustomComponent({
            noshadow: noshadow,
            name: name+'-accordion-item',
            root: `
            <style>.accordion{background-color:grey;color:#fff;cursor:pointer;font-family:Poppins;font-style:normal;font-weight:500;font-size:14px;line-height:21px;padding:18px;width:100%;text-align:left;border:none;outline:0;transition:.4s;margin: 0;}.accordion:after{content:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDE0IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03IDdMMC45Mzc4MjIgMC4yNUwxMy4wNjIyIDAuMjUwMDAxTDcgN1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=);font-size:13px;color:#777;float:right;margin-left:5px;color:#000}.clicked:after{content:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDE0IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03IDBMMTMuMDYyMiA2Ljc1TDAuOTM3ODIyIDYuNzVMNyAwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==);color:#000}.accordion:hover,.clicked{background-color:red;color:#fff}.panel{background-color:#fff;max-height:0;margin-bottom:15px;overflow:hidden;transition:max-height .2s ease-out}</style>
            <div><button class=accordion></button><div class=panel><slot></div></div>
            `,  
            initial: (shadow, element) => { 
                let showInfo = false
                shadow.querySelector('button').innerText = element.getAttribute('head-title'); 
                const button = shadow.querySelector('button')
                const panel = shadow.querySelector('.panel')
                if(headstyle) for (let key in headstyle) {
                    button.style[key] = headstyle[key]
                }
                if(panelstyle) for (let key in panelstyle) {
                    panel.style[key] = panelstyle[key]
                }
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
            }
        })
    }
    buildTabList({name, type, wrapper={}}) {
        this.buildCustomElement({
            style: {
                display: 'flex',
                flexDirection: type == 'horizontal' ? 'row' : 'column',
                ...wrapper
            },
            template: {
                name: name+'-tablist',
                attributes: []
            } 
        })
    }
    buildCard({name, width=270, height=350, mediaHeight=225 } ) { 
        this.buildCustomComponent({
            name: name+'-card',
            obsAtt: ['display'],
            root: `
                <style>
                    .card {
                        min-height: ${height}px;
                        width: ${width}px;
                        border: 0.8px solid #E2E2E2;
                        border-radius: 4px;
                        background: #FFFEFE;
                        margin: auto;
                    }
                    .card-media {
                        max-width: 100%;
                        max-height: ${mediaHeight}px;
                        display: flex;
                        justify-content: center;
                        align-items: center; 
                    }
                    .card-body {
                        padding: 14px 24px;
                        display: flex;
                        flex-direction: column;
                        row-gap: 4px;
                        border-top: 0.8px solid #E2E2E2;
                    } 
                    .card-actions {
                        padding: 14px 24px; 
                        display: flex;  
                        justify-content: center;
                        align-items: center; 
                    } 
                </style>
                <div class="card">
                    <div class='card-media'>
                         <slot name='card-image' />
                    </div>
                    <div class='card-body'>
                        <div class="card-detail">
                            <slot name='card-detail' />
                        </div>
                        <div class="card-price">
                            <slot name='card-price' /> 
                        </div>
                        <div class="card-review">
                            <slot name='card-review' />
                        </div>
                    </div>
                    <div class='card-actions'>
                        <slot name='card-actions'/>
                    </div>
                </div>
            `, 
            onChangeAtt(shadow, name, oldatt, newatt) {
                const card = shadow.querySelector('.card')
                if(newatt == 'grid') {
                    card.style.display = 'flex'
                    card.style.flexDirection = 'column'
                    card.style.width = width+'px'
                    card.style.maxWidth = null
                    card.style.minHeight = height+'px'
                } 
                if(newatt == 'flex' ) {
                    card.style.display = 'flex'
                    card.style.flexDirection = 'row'
                    card.style.width = '100%'
                    card.style.maxWidth = 'max-content'
                    card.style.minHeight = 'max-content'
                }
            }
        })
    }
}