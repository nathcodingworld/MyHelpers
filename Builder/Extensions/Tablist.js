// not finish

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