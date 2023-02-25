const LN = new Listener()

LN.listens([ 
    {
        element: document.querySelector('.target'),
        target: 'test:update',
        callback: (e)=> {
            console.log(e);
            e.target.innerText = e.detail.message
            e.target.style.color = 'red'
        }
    }, { 
        target: 'test_:add:all:.target',
        callback: (e)=> { 
             const div = document.createElement('div')
             div.style.color = 'blue'
             div.innerText = e.detail.message
             e.target.append(div)
        }
    }, {
        element: document.getElementById('here'),
        target: ':click',
        callback: (e)=> {  
            LN.trigerEvent('test:update', {
                message: 'success, print this'
            })
        }
    }, {
        element: document.getElementById('add'),
        target: ':click',
        callback: (e)=> { 
            LN.trigerEvent('test_1:add', {
                message: 'success, this is added'
            }) 
        } 
    }  , {
        element: document.getElementById('add2'),
        target: ':click',
        callback: (e)=> { 
            LN.trigerEvent('test_0:add', {
                message: 'success, this is added'
            }) 
        } 
    }  , {
        element: document.getElementById('add3'),
        target: ':click',
        callback: (e)=> { 
            LN.trigerEvent('test_2:add', {
                message: 'success, this is added'
            }) 
        } 
    }  
])


// LN.listen('test:update', (e)=> { 
//     e.target.innerText = e.detail.message
//     e.target.style.color = 'red'
// }, document.querySelector('.target'))

// LN.listen('test_:add:all:.target', (e)=> { 
//     const div = document.createElement('div')
//     div.style.color = 'blue'
//     div.innerText = e.detail.message
//     e.target.append(div)
// })

// LN.listen(':click', (e)=> {  
//     LN.trigerEvent('test:update', {
//         message: 'success, print this'
//     })
// }, document.getElementById('here'))

// LN.listen(':click', (e)=> { 
//     LN.trigerEvent('test_1:add', {
//         message: 'success, this is added'
//     }) 
// }, document.getElementById('add'))

// LN.listen(':click', (e)=> { 
//     LN.trigerEvent('test_0:add', {
//         message: 'success, this is added'
//     }) 
// } , document.getElementById('add2'))

// LN.listen(':click', (e)=> { 
//     LN.trigerEvent('test_2:add', {
//         message: 'success, this is added'
//     }) 
// }, document.getElementById('add3'))

   const test = {
    asd_: ["01", '02']
   }

   console.log(test['asd_']['1']);
