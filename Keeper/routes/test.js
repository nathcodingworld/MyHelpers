const KP = new Keeper({name: 'keeperdata', clear:true})

const [data, keepData] = KP.load("data") 
const [sample, setSample] = KP.recieve("sample")
const [test, setTest] = KP.recieve("test")
console.log( sample, test);

 console.log(data);
 