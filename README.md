## The Observer 

To use the Observer, Copy the Observer.js file in Observer folder

#### Initialize Observer
```javascript
    const observer = new Observer()
```
#### observe
```javascript
// instructions = key : observer : type : targets : parent 

// add key if you want to disconnect observer or anobserve element
// key = _uniquekey (optional) 
// observer = intersection | mutation | resize
// type = one | all
// targets = query selector
// parent = query selector (optional)
 
// sample intersection observer
    observer.observe({
        instructions: '_card:intersection:all:.card',
        callback: entry => {
            if(entry.isIntersecting) {
                entry.target.classList.remove('hidden')
            } else entry.target.classList.add('hidden')  
        },
        options: {} // optional
    })

// sample mutation observer 
     observer.observe({
        instructions: '_paper:mutation:all:.paper',
        callback: entry => {
            console.log('child have been changed');
        },
        options: {
            subtree: true,
            childList: true
        }
    })
    
// sample resize observer 
     observer.observe({
        instructions: '_area:resize:all:.area',
        callback: entry => {
            if(entry.contentRect.width < 300) {
                entry.target.style.background = 'blue'
            } else entry.target.style.background = 'red'
        },
        options: {} // optional 
    })
``` 
#### unobserve element or disconnect observer
```javascript
// instructions =  observer : key : type 
// type = del | undefine (optional) 'del' if you will disconnect observer

// reset = function to run to elements before removing observer (optional)
// element = element to be unobserve by observer (optional)
// index = index of element in collection[key] array to be unobserve (optional)


// sample of disconecting observer 
    observer.disregard({
        instructions: '_card:intersection:del',
        reset: el=> el.classList.remove('hidden')
    })

// sample of unobserving element by selector
    observer.disregard({
        element: document.querySelector('.card.remove'),
        instructions: '_card:intersection'
    })

// sample of unobserving element by index of saved elements in collection
    observer.disregard({
        index: 4,
        instructions: '_card:intersection'
    })
```