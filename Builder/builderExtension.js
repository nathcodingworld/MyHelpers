
function Accordion(builder, {name, wrapperstyle={}, headstyle={}, panelstyle={}, noshadow = true}) {
    builder.customElement({ 
        style: { 
            display: 'block',
            ...wrapperstyle
        }, 
        template: {
            name: name+'-accordion',
            attributes:  [],
            element: HTMLElement,
            body: ''
        }
    })
    builder.customComponent({
        style: {
            accordion: { 
                backgroundColor:'grey',
                color:'#fff',
                cursor:'pointer',
                fontFamily:'Poppins',
                fontStyle:'normal',
                fontWeight:'500',
                fontSize:'14px',
                lineHeight:'21px',
                padding:'18px',
                width:'100%',
                textAlign:'left',
                border:'none',
                outline:'0',
                transition:'.4s',
                margin: '0',
                ':hover': {
                    backgroundColor:'red',
                    color:'#fff'
                },
                ':after' : {
                    float:'right',
                    content:'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDE0IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03IDdMMC45Mzc4MjIgMC4yNUwxMy4wNjIyIDAuMjUwMDAxTDcgN1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=)',
                    color:'#777',
                    marginLeft:'5px',
                    color:'#000'
                }
            },
            panel: {
                backgroundColor:'#fff',
                maxHeight:'0',
                marginBottom:'15px',
                overflow:'hidden',
                transition:'max-height .2s ease-out'
            },
            clicked:{
                backgroundColor:'red',
                color:'#fff',
                ':after': {
                    content:'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDE0IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03IDBMMTMuMDYyMiA2Ljc1TDAuOTM3ODIyIDYuNzVMNyAwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==)',
                    color:'#000'
                }
            }
        },
        template: {
            noshadow: noshadow,
            name: name+'-accordion-item',
            root: '<div><button class=accordion></button><div class=panel><slot></div></div>',  
        },
        script: {
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
                    console.log(showInfo);
                    if(showInfo) {
                        button.classList.add('clicked')
                        panel.style.maxHeight = panel.scrollHeight + "px"; 
                    } else {
                        button.classList.remove('clicked')
                        panel.style.maxHeight = 0;  
                    }
                });  
            }
        }
    })
}
function TabList(builder, {name, type, wrapper={}}) {
    builder.customElement({
        style: {
            display: 'flex',
            flexDirection: type == 'horizontal' ? 'row' : 'column',
            ...wrapper
        },
        template: {
            name: name+'-tablist',
            attributes: [],
            element: HTMLElement,
            body: ''
        } 
    })
} 
function Card(builder, {name, width=270, height=350, mediaHeight=225 } ) { 
    builder.customComponent({
        style: {
            card: {
                minHeight: height+'px',
                width: width+'px',
                border: '0.8px solid #E2E2E2',
                borderRadius: '4px',
                background: '#FFFEFE',
                margin: 'auto',
            },
            cardMedia: {
                maxWidth: '100%',
                maxHeight: mediaHeight+'px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            cardBody: {
                padding: '14px 24px',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '4px',
                borderTop: '0.8px solid #E2E2E2',
            },
            cardActions: {
                padding: '14px 24px',
                display: 'flex',  
                justifyContent: 'center',
                alignItems: 'center', 
            }
        },
        template: {
            name: name+'-card',
            root: `
                <div class="card">
                    <div class='cardMedia'>
                         <slot name='card-image' />
                    </div>
                    <div class='cardBody'>
                        <div class="cardDetail">
                            <slot name='card-detail' />
                        </div>
                        <div class="cardPrice">
                            <slot name='card-price' /> 
                        </div>
                        <div class="cardReview">
                            <slot name='card-review' />
                        </div>
                    </div>
                    <div class='cardActions'>
                        <slot name='card-actions'/>
                    </div>
                </div> `, 
                attributes: ['display'],
        },
        script: {
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
        }
        
    })
}