const BD = new Builder()

 
BD.customComponent({ 
    style: {
        userCard: {
            fontFamily: "'Arial', sans-serif",
            background: '#f4f4f4',
            width: '500px',
            display: 'grid',
            gridTemplateColumns:' 1fr 2fr',
            gridGap: '10px',
            marginBottom: '15px',
            borderBottom: 'darkorchid 5px solid',
        },
        userCardImg: {
            width: '100%',
        },
        userCardBtn: {
            cursor: 'pointer',
            background: 'darkorchid',
            color: '#fff',
            border: '0',
            borderRadius: '5px',
            padding: '5px 10px',
        }
    },
    template: {
        name: 'user-card', 
        root: ` 
            <div class="userCard">
                <img class="userCardImg" />
                <div>
                <h3></h3>
                <div class="info">
                    <p><slot name="email" /></p>
                    <p><slot name="phone" /></p>
                </div>
                <button class="userCardBtn" id="toggle-info">Hide Info</button>
                </div>
            </div>`, 
    },
    script: {
        initial: (shadow, element) => { 
            shadow.querySelector('h3').innerText = element.getAttribute('name');
            shadow.querySelector('img').src = element.getAttribute('avatar');
        }, 
        onMount: (shadow, element) => {
            let showInfo = true
            shadow.querySelector('#toggle-info').addEventListener('click', () => {
                showInfo = !showInfo;
                const info = shadow.querySelector('.info');
                const toggleBtn = shadow.querySelector('#toggle-info');
    
                if(showInfo) {
                info.style.display = 'block';
                toggleBtn.innerText = 'Hide Info';
                } else {
                info.style.display = 'none';
                toggleBtn.innerText = 'Show Info';
                }
            }); 
        }, 
        onDismount: (element) => {
            element.shadowRoot.querySelector('#toggle-info').removeEventListener();
        } , 
    }
    
})
 
BD
.register( Accordion, [{ name: 'custom', }]) 
.register( Card, [{name: 'product', actionFW: true}]) 

 document.getElementById('rt').addEventListener('click',()=> {
    document.querySelectorAll('product-card').forEach(el=> {
        el.setAttribute('display', 'flex')
    })
 })

 document.getElementById('re').addEventListener('click',()=> {
    document.querySelectorAll('product-card').forEach(el=> {
        el.setAttribute('display', 'grid')
    })
 })