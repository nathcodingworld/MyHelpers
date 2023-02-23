const LN = new Listener()

LN.listens([ 
    {
        target: 'test:update:one:.target',
        callback: (e)=> {
            console.log(e);
            e.target.innerText = e.detail.message
            e.target.style.color = 'red'
        }
    }, {
        target: 'test:add:one:.target',
        callback: (e)=> {
            console.log(e);

             const div = document.createElement('div')
             div.style.color = 'blue'
             div.innerText = e.detail.message
             e.target.append(div)
        }
    }, {
        target: ':click:one:#here',
        callback: (e)=> { 
            console.log(e);

            LN.trigerEvent('test:update', {
                message: 'success, print this'
            })
        }
    }, {
        target: ':click:one:#add',
        callback: (e)=> { 
            console.log(e);

            LN.trigerEvent('test:add', {
                message: 'success, this is added'
            }) 
        },
        options: {
            once: true
        }
    } 
])
   