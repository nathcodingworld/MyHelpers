const BD = new Builder()

BD.createCustomElement({
    style: `
        h3 { 
            color: green 
        }
        button {
            background: red;
            color: black;
        }
        p {
            color: violet ;
        }
    `,
    template: `
        <div>
            <h3>
                <slot></slot>
            </h3>
            <button>buttn</button>
            <p>hello</p>
        </div>
    `,
    script: {
        initial: (root) => {
            console.log(root);
            root.querySelector('.somethinfg')
        }, 
        onMount: (root) => {
            console.log(root);
            root.querySelector('.somethinfg')
            root.querySelector('.somethinfg')
    
        }, 
        onDismount: (root) => {
            console.log(root);
            root.querySelector('.somethinfg')
        }, 
        onChangeAtt: (root) => {
            console.log(root);
            root.querySelector('.somethinfg')
        }, 
    },
    data: {
        name: 'todo-list',
        attributes: []
    }
})

BD.createCustomElementtest({ 
    template: `
        <style>
            h3 { 
                color: green 
            }
            button {
                background: red;
                color: black;
            }
            p {
                color: violet ;
            }
        </style>
        <div>
            <h3>
                <slot></slot>
            </h3>
            <button>buttn</button>
            <p>hello</p>
        </div>
    `, 
    initial: (root) => {
        console.log(root);
        root.querySelector('.somethinfg')
    }, 
    onMount: (root) => {
        console.log(root);
        root.querySelector('.somethinfg')
        root.querySelector('.somethinfg')

    }, 
    onDismount: (root) => {
        console.log(root);
        root.querySelector('.somethinfg')
    }, 
    onChangeAtt: (root) => {
        console.log(root);
        root.querySelector('.somethinfg')
    }, 
    name: 'todo-list',
    attributes: [] 
})