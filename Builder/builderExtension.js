
function Accordion(builder, {name, noshadow = false}) {
    builder.customElement({ 
        style: { 
            display: 'block', 
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
                fontFamily: 'Inter',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: '28px',
                backgroundColor:'#F6F6F6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor:'pointer',  
                padding:'24px 32px',
                width:'100%',
                textAlign:'left',
                border:'none',
                outline:'0',
                transition:'.4s',
                margin: '0',
                ':hover': {
                    backgroundColor:'#9A2E25',
                    color:'#fff'
                },
                ':after' : {
                    float:'right',
                    content:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIjSURBVHgB7ZiLcdswDEBfu0A1AjaoRlAnaDaIOoG9gTWCNwg3aDqB2wncThBvkHSCljxJZ1DWh6To5JLLu8P5bIMkCJAASXjnjfOBPBSdSPf9ycqp+3wxKit7Kw9W/k3I0cqdlRuekY2VxxmjpsRN5JZIYkJc0nqjVL+5EP62cm/lL21YHUWn95nW04Vq43S+KN0sOK8NvbEZDDyF06m5XApbMrEbdNyQTjPoa8dKtOecB0rWI/jeTPak4Bsn5EPwjUyauO5AyE+Jn46iqMmz5pZoSAx1770Hrk8/1mNogxvOs7rl+mzVeFVIA8N5RiF5bi0F58q0D2lw7JTvJ/4XKwfiNo50/U7t1gOBS6pgfnMI/voUwozT62ysjQ6zF7WPI531jG39k5VfSnfJk0OdH4zXYH0sm11WFWEL1rCcxAU/lxrWjxuuuGCkRBgXNa4oxZplzIiRscY5dGqbLXt6k4RmdjMwMtY4R8PEJhmjH+BAOIbLE7SJaP+diJq8Jy1RG9KM04n6LqRBRWIBpzXMEEetxvsa2qif0WJmz4BO/MHozN5wPXasOJgcWXniXUDwd380JcvVIhUh04ldhzqXkSWZLk09DfmuijvyXWE9tow/Y4Re3DckXtxjnj6Ey+OVOyb9tPKH9gnkSel+oq2xJf5EnN637vMq1My/aE2Jy63ZnjtCcN4x+OloKG4irnRWJJLzAVM4h/JEG+4XfcB851XwH/vqE/97kFNbAAAAAElFTkSuQmCC)',
                    color:'#777',
                    height: '40px',
                    color:'#000'
                }
            },
            panel: {
                backgroundColor:'#F6F6F6',
                maxHeight:'0',
                marginBottom:'15px',
                overflow:'hidden',
                transition:'max-height .2s ease-out'
            },
            clicked:{
                backgroundColor:'#9A2E25',
                color:'white',
                ':after': {
                    content:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJESURBVHgB7ViLccIwDBVdoBnBG7QjpBOUDUongA1gBDaADcoGdAPoBMkGoROo8sU5ZJOPZJxy7fHudDmCJD//pEgAd/xzTCABEDGjhxXjXp1IyslkcoJbgUjlJGuSArtxINmQTOG3QIPNSSrUoyB5AyXEW0zOn+mxIXlmr+0WHkl2JN8kpXufOb0nktz9bmB1Xmj7S0gFt2rhaszd2RuyzUhmeHkUFpAC5GgZOF5BJKxt4GsJ1yBYucJt87U+TbCacSvpHHFyBhKhhaR+4oEDA4lhSTH/B63xLMWZE4yzitpqtnoFjAw2ViU1mLJZqQIr1lljo7RZsPFyicG2mREK4lxAroGYJNZxsslMa4nBwSnvQIiAXAzJvehIudmoLkdArkD/9otIBtuc9Snyq/8qcBySM3gZ4wZJoh81TJ9izhRzUJJj/6lIiseVKvaRiyGpIcjT2yyWnJYk+qGtO+2hf0kWHQNWEnIdJLtWe8XGzYYcNs72Hf/bi3RARX52JPddNvT+w405nJOxrjMQlYE6FugH6osj8NBi0wRoS24G42MK55JAlhz4OYORgTEfJuhH9hWMBPTLCV3Fh+ec3H/148l5X+ygBfppr9DcWiG5gvk3EINgq5OQdBPn5K4rPzFhqYgJS9jQ8SJwXNhDjfLCfY6Rhbum9WHoYbOLYa9t6+OT5AvqFkjTzbI6j1DHOHvB+ESs3ju1Po4wBrC9jSFBhanaHUKi9gtki344wpajYFNnDpFI2cA0cN7KkuR00wbmHX8FP+9BMgJ4vnpyAAAAAElFTkSuQmCC)',
                    color:'#000'
                }
            }
        },
        template: {
            noshadow: noshadow,
            name: name+'-accordion-item',
            root: '<div><button class="accordion"></button><div class="panel"><slot></div></div>',  
        },
        script: {
            onMount: (root) => { 
                let showInfo = false
                root.shadow.querySelector('button').innerText = root.getAttribute('head-title'); 
                const button = root.shadow.querySelector('button')
                const panel = root.shadow.querySelector('.panel') 
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
                alignItems: 'center'
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

function Modal(builder, {name, height, width, Orient = 'Top', noshadow=false}) {
    builder.customComponent({
        style: {
            Modal: { 
                '&Active': {  
                    zIndex: '200',
                    position: 'fixed',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'gray',
                    transition: 'all 0.5s', 
                }
            },
            CloseNav: {
                content: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAFMSURBVDhPlZRBi8IwFISL7oI/14uCyy56UBAPHjws7O8TBX+DmvpNeemmSWzTB2NCMjNNM31WdV1vnHNn8MX8oxpZaGZgj/4Gfip+rizUjA9tgGJTuDN0f+BpHmcZLsxMC09wYjpoKg7cX2lM+wCLZgPoyH5DJdOpaZOSBo5O5kwjsyXTSUg4BQSddNcSgjJubKb773KNKNPwFdZaN4o4ujO9pje7M2xA8uCm2JhC2gF/p21QIA5AezJ7ezVNQZhAXptAwiYoEAeQvua7gpgLKh9AaSHoBKUys96T9T1FYeS+x08w+nRJAIKfM5R3lIiIkgBAEpS4JsuXCBCzHaA9UN5REkDo7QDjDHcUC8UdwJo3Da/kv6OYjO4A7cHLdpT+vo6gEwDTwc9CHLhxUFsZXmyhDcA0gwU3Duomw29wBfMxZr5kivYALs651QtdoyYWFjDv8QAAAABJRU5ErkJggg==)',
            },
            Top: {
                '&Orient': {
                    height: '0',
                    width: '100%',
                    position: 'fixed',
                    zIndex: '2',
                    top: '0',
                    left: '0',
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    transition: '0.5s',
                },
                '&Active': {
                    height: height || '200px',
                }
            },
            Left: {
                '&Orient': {
                    height: '100%',
                    width: '0',
                    position: 'fixed',
                    zIndex: '200',
                    top: '0',
                    left: '0',
                    backgroundColor: 'white',
                    transition: '0.5s',
                    overflow: 'hidden',
                },
                '&Active': {
                    width: width || '250px',
                }
            },
            ModalWrapper: {
                position: 'relative',
                '& > button': {
                    position: 'absolute',
                    right: '20px',
                    top: '20px',
                    background: 'red',
                    border: 'none',
                    cursor: 'pointer',
                }
            }

        },
        template: {
            name: name + '-modal',
            attributes: ['display'],
            noshadow: noshadow,
            root:  ` 
            <div class="Modal">
                <div class="ModalWrapper ${Orient}Orient">
                    <button class="CloseNavBtn" >
                        <img class="CloseNav" alt="close icon">
                    </button>
                    <div class="ModalContent">
                        <slot name="modalContent" />
                    </div> 
                </div> 
            </div>`
        },
        script: { 
            initial: (shadow, element) => {
                const close = shadow.querySelector('.CloseNavBtn')
                const modal = shadow.querySelector('.Modal')  
                const opens = document.querySelectorAll('.'+element.getAttribute('key'))
                console.log(opens);
                opens.forEach(oel=>{
                    oel.addEventListener('click', ()=>{
                        console.log("opened");
                        element.setAttribute('display', 'opened') 
                    })
                })
                close.addEventListener('click', (e)=>{
                    element.setAttribute('display', 'closed')
                })
                modal.addEventListener('click', (e)=> {
                    e.stopPropagation() 
                    if(e.target === e.currentTarget) {
                        element.setAttribute('display', 'closed') 
                    } 
                })
            },
            onChangeAtt: (shadow, name, oldatt, newatt) => {
                const modal = shadow.querySelector('.Modal')
                const wrapper = shadow.querySelector('.ModalWrapper')
                if(newatt === "opened") {
                    modal.classList.add('ModalActive')
                    wrapper.classList.add(Orient+'Active')
                } else{
                    modal.classList.remove('ModalActive')
                    wrapper.classList.remove(Orient+'Active')
                }
            }
        }

    })
}