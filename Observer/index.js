const OB = new Observer()

const input = document.querySelectorAll('.card input')  
const paper = document.querySelectorAll('.text')  
input.forEach((el, i)=> {
    el.addEventListener('input', (e)=> { 
        paper[i].innerText = e.target.value
    })
})

function fade (entry) {
    if(entry.isIntersecting) {
        entry.target.classList.remove('hidden')
    } else entry.target.classList.add('hidden')  
}
OB.observeAll([
    {
        instructions: '_card:intersection:all:.card',
        callback: fade
    },{
        instructions: '_paper:intersection:all:.paper',
        callback: fade
    },{
        instructions: '_area:resize:all:.area',
        callback: entry => {
            if(entry.contentRect.width<300) {
                entry.target.style.background = 'blue'
            } else entry.target.style.background = 'red'
        }
    },{
        instructions: '_paper:mutation:all:.paper',
        callback: entry => {
            console.log(entry);
        },
        options: {
            subtree: true,
            childList: true
        }
    }
])
console.time('observe')

setTimeout(() => { 
// OB.reObserve(  '_card:intersection', el=>{
//     el.classList.remove('hidden') 
// },  entry=>{
//     if(entry.isIntersecting) {
//         entry.target.classList.remove('movenx')
//     } else entry.target.classList.add('movenx')   
// })
OB.disregards([
     {
        instructions: '_card:intersection:del',
        reset: el=> el.classList.remove('hidden')
     },{
        instructions: '_paper:intersection:del',
        reset: el=> el.classList.remove('hidden')
     },{
        instructions: '_area:resize:del' 
     },{
        instructions: '_paper:mutation:del' 
     } 
])  
}, 3000);
    


console.timeEnd('observe')