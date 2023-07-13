

// const aa = {test:['asd','aasd']}
// const bb = JSON.stringify(aa)
// console.log(encodeURIComponent(bb));
// const test = window.location.search
// const s = new URLSearchParams(test);
// const q = s.get("q")
// console.log(q);

const KP = new Keeper()
KP.makeSpace('test', ["t1", 't2'])
KP.makeSpace('aff', ["ta1", 'ta2'])
KP.makeSpace('daa', ["td1", 'td2'])

// document.querySelector('button').addEventListener('click', ()=> KP.sendData())

 KP.sendData(document.querySelector('a'), 'daa:aff')