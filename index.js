const BD = new Builder()

BD.createCustomElement({
    style: `
        h3 { color: green }
    `,
    template: `
    <h3>
        <slot></slot>
    </h3>
    `,
    script: {
        initial: (root) => {
            console.log(root);
        },
        onMount: (root)=> {
            console.log("hello");
        }
    },
    data: {
        name: 'todo-list',
        attributes: []
    }
})