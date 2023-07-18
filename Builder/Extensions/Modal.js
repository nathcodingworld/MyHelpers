// not finish
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
                <div class="ModalWrapper ${Orient}Orient"><button class="CloseNavBtn" >
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