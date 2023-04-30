

# My Helpers


## The Setter 

To use the Setter, Copy the Setter.js file in Setter folder

#### Initialize Setter
```javascript
    const setter = new Setter()
```
#### mediaQuery
```javascript
// instruction = filter : mediaQuery
// filter = min | max 
// mediaQuery =  sm | md | lg | xl | xxl
// or 
// instruction = filter : : minwidth : maxwidth
// filter = between | around 

// will run only in the first load
// sample 
    setter.mediaQuery({
        instruction: 'min:lg',
        run: () => console.log('will run if width is greater than 992px in the first load')
    })

// or 
    setter.mediaQuery({
        instruction: 'around::lg:xxl',
        run: () => {
            console.log('will run if width is less than 992px and greater than 1400px in the first load')
        }
    })
```
#### mediaQueries
```javascript
    setter.mediaQueries([
        {
            instruction: 'around::lg:xxl',
            run: () => {
                console.log('will run if width is less than 992px and greater than 1400px in the first load')
            }
        },{
            instruction: 'min:lg',
            run: () => console.log('will run if width is greater than 992px in the first load')
        }
    ])
```
#### setElement
```javascript
// instruction = key : type : selector
// key = namekey (unique name, optional, add key if you want to save the elements for later use)
// type =  all | first | last 
// or add underscore to get saved elements to reset or set new function
// type = _all | _first | _last
// selector = queryselectorAll

//sample without key
    setter.setElement({
        instruction: ':all:.product-cards',
        set: el => {
            el.classList.add('animate')
        }
    })

//sample with key
    setter.setElement({
        instruction: 'cards:all:.product-cards',
        set: el => {
            el.classList.add('animate')
        }
    })

// then to set again the first .product-cards element in the cards key
    setter.setElement({
        instruction: 'cards:_first',
        set: el => {
            el.classList.add('hidden')
        }
    })

// to get all the elements in cards collection 
    const cards = setter.getElement('cards:_all')
```


## The Listener 

To use the Listener, Copy the Listener.js file in Listener folder

#### Initialize Listener
```javascript
    const listener = new Listener()
```
#### add event listener
```javascript
// instruction = key : event : type : selector

// unique name, optional, add key if you will use custom event, to be trigger
// key = namekey  

// add undescore if you want to save callback function and elements to remove/update later
// key = _namekey  

// event = event
// type =  all | one  
// selector = element selector

//sample with instruction only
    listener.listen({
        instruction: '_cards:click:all:.product-cards',
        callback: (e) => {
            e.target.innerText = 'this is clicked'
        }
        options: {  }
    })

//sample with element
    listener.listen({
        element: document.getElementById('card'),
        instruction: ':click',
        callback: (e) => {
            e.target.innerText = 'this is clicked'
        }
        options: { once: true }
    }) 
```
#### custom event listener
```javascript
//custom event sample
    listener.listen({  
        instruction: '_custom:activate:all:.target',
        callback: (e) => {
            e.target.innerText = 'this is activated'
            console.log('this is the message from activate event: ' + e.detail.message)
        } 
    })

//trigger the custom event
    listener.trigerEvent('_custom:activate', {
        message: 'hello, from activate event'
    }, 4 ) // instruction: string, detail: Object, index of saved elements: number
```
#### remove event listener
```javascript 
// remove event listener from saved _card collection one by one
// ignore (
//      instruction = key : event,
//      index: index in _card collection array (default 0),
//      clear: (boolean) to remove saved _card collection after removing one event (default  false)
// )

  listener.ignore('_card:click', 5) 
  listener.ignore('_custom:activate') 
// remove all is not yet added to this function
``` 


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
