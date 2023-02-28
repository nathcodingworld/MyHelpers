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

console.time('observe')
 
OB.observeAll([
    {
        instructions: ':intersection:all:.card',
        callback: fade
    },{
        instructions: ':intersection:all:.paper',
        callback: fade
    },{
        instructions: ':resize:all:.area',
        callback: entry => {
            if(entry.contentRect.width<300) {
                entry.target.style.background = 'blue'
            }
        }
    },{
        instructions: ':mutation:all:.paper',
        callback: entry => {
            console.log(entry);
        },
        options: {
            subtree: true,
            childList: true
        }
    }
])
 


 
 console.timeEnd('observe')