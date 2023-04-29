

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

// sample 
    setter.mediaQuery({
        instruction: 'min:lg',
        run: () => console.log('will run if width is greater than 992px')
    })
// or 
    setter.mediaQuery({
        instruction: 'around::lg:xxl',
        run: () => console.log('will run if width is greater than 992px and less than 1400px')
    })
```
#### mediaQueries
```javascript
    setter.mediaQueries([
        {
            instruction: 'around::lg:xxl',
            run: () => console.log('will run if width is greater than 992px and less than 1400px')
        },{
            instruction: 'min:lg',
            run: () => console.log('will run if width is greater than 992px')
        }
    ])
```