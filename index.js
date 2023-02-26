const OB = new Observer()


OB.observeIntersection({
    instructions: 'all:.card',
    onIntersect: (entry) => {
        if(entry.isIntersecting) entry.target.classList.remove('hidden')
        else entry.target.classList.add('hidden')
    },
    options: {
        rootMargin: '100px',
    }
})

 