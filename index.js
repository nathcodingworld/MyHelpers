const builder = new Builder()
const listener = new Listener()
function Accordion({name, noshadow = true}) {
    builder.customElement({ 
        style: { 
            display: 'block'
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
                button.addEventListener('click', () => {
                    showInfo = !showInfo; 
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
Accordion({ name: 'custom', })