function Card(builder, {name,  style } ) { 
    builder.customComponent({ 
        style: style,
        template: {
            name: name ,
            root:  '<style id=pastehere></style><style>.card{border-radius:10px;overflow:hidden;border:1px solid gray;transition:all .3s ease-in-out}.cardRow{display:flex;flex-direction:row-reverse;width:100%;height:100%;min-height:unset}.cardRow .cardMedia{border-radius:10px;margin:10px}.cardMedia{min-height:20px;overflow:hidden}.cardActions,.cardBody{padding:10px 8px}img{height:100%;width:100%}.cardDetail{width:100%;display:flex;flex-direction:column;justify-content:space-between}.cardActions{border-top:1px dashed gray;display:flex;flex-direction:row;justify-content:space-between;padding-bottom:18px}.cardActions>*{display:flex;width:max-content;flex-direction:row;column-gap:8px}</style><div class="card cardRow"><div class=cardMedia><img src="" alt=""></div><div class=cardDetail><div class=cardBody><slot></div><div class=cardActions><div><slot id=rightactions name=Actions></div><div><slot id=leftactions name=LeftActions></div></div></div></div>',  
            attributes: ['display'],
        },
        script: {
            onMount(root) {
                const src = root.getAttribute("media")
                const alt = root.getAttribute("mediaAlt") 
                const img = root.shadow.querySelector('img')  
                const ca = root.shadow.querySelector('.cardActions')  
                const right = root.shadow.getElementById('rightactions')?.assignedElements();   
                const left = root.shadow.getElementById('leftactions')?.assignedElements();   
                if(right.length == 0  && left.length == 0  )  ca.remove() 
                if(src) {
                    img.src = src
                    img.alt = alt
                } else img.remove()
            },
            onChangeAtt(root, name, oldatt, newatt) {
                const card = root.querySelector('.card')
                if(newatt == 'grid') {
                    card.classList.remove('cardRow')
                } else card.classList.add('cardRow')
            }
        }
        
    })
}