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