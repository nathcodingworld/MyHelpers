const ST = new Setter()


ST.setElement({
    instruction: 'test:all:.test',
    set: el=> {
        console.log(el);
        el.innerHTML = "all text"
    }
})

ST.setElement({
    instruction: 'test:_first',
    set: el=> {
        console.log(el);
        el.innerHTML = "first text"
    }
})
 

ST.setStyle( ':all:.test', {
    backgroundColor: 'red',
    color: 'blue' ,
    height: '100px',
    border: '1px solid green'
}, document.querySelector('.wrap'))

const test = document.querySelector('button')
test.addEventListener('click',()=> {
   ST.toggleDisplay('toggle', document.querySelector('.test') )
}) 
