const BD = new Builder()

 
BD.buildCustomComponent({ 
    name: 'user-card', 
    root: `
        <style>
            .user-card {
                font-family: 'Arial', sans-serif;
                background: #f4f4f4;
                width: 500px;
                display: grid;
                grid-template-columns: 1fr 2fr;
                grid-gap: 10px;
                margin-bottom: 15px;
                border-bottom: darkorchid 5px solid;
            } 
            .user-card img {
                width: 100%;
            } 
            .user-card button {
                cursor: pointer;
                background: darkorchid;
                color: #fff;
                border: 0;
                border-radius: 5px;
                padding: 5px 10px;
            }
        </style>
        <div class="user-card">
            <img />
            <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email" /></p>
                <p><slot name="phone" /></p>
            </div>
            <button id="toggle-info">Hide Info</button>
            </div>
        </div>
    `, 
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
})
 
BD.registerAccordion({ name: 'custom', })