 

const KP = new Keeper({
  name: 'keeperdata',
  main: true,
});

const [datas, keepDatas] = KP.keep({
  data: 'data',
  name: 'hello worlds'
}, "data")

const [sample, keepSample] = KP.keep({
  sample: 'sample',
  name: 'hello worlds'
}, "sample")

const [test, keepTest] = KP.keep({
  test: 'test',
  name: 'hello worlds'
}, "test")

const [data, setData] = KP.makeSpace("test", {
  list: new List(),
  LinkedList: new LinkedList(10),
  Graph: new Graph(),
  Queue: new Queue(),
  Stack: new Stack(),
  Tree: new Tree(), 
  Array: new Array(5000).fill(new Array(10)),
  Object: new Object()
});
performancetest(() => { 
  setData((dt) => {
    [1, 45, 34, 23, 43, 11, 22, 12, 41, 14, 18].forEach((item) => {
      dt.list.push(item);
    });
    dt.Queue.enqueue("joy");
    dt.Queue.enqueue("enrik");
    dt.Queue.enqueue("jobert");
    dt.Queue.dequeue();
    dt.Queue.dequeue();
    dt.Queue.enqueue("sara");
    // dt.Queue.printList();
    dt.Graph.addVertex("0");
    dt.Graph.addVertex("1");
    dt.Graph.addVertex("2");
    dt.Graph.addVertex("3");
    dt.Graph.addVertex("4");
    dt.Graph.addVertex("5");
    dt.Graph.addVertex("6");
    dt.Graph.addEdge("3", "1");
    dt.Graph.addEdge("3", "4");
    dt.Graph.addEdge("4", "2");
    dt.Graph.addEdge("4", "5");
    dt.Graph.addEdge("1", "2");
    dt.Graph.addEdge("1", "0");
    dt.Graph.addEdge("0", "2");
    dt.Graph.addEdge("6", "5");
    // dt.Graph.showConnections();
    dt.LinkedList.append(5);
    dt.LinkedList.append(16);
    dt.LinkedList.prepend(1);
    dt.LinkedList.insert(1, 99);
    dt.LinkedList.insert(20, 88);
    dt.LinkedList.remove(1);
    dt.LinkedList.reverse();
    dt.LinkedList.remove(2);
    // dt.LinkedList.printList();
    dt.Stack.push("Discord");
    dt.Stack.push("Udemy");
    dt.Stack.push("google");
    dt.Stack.printList();
    dt.Tree.insert(9);
    dt.Tree.insert(4);
    dt.Tree.insert(6);
    dt.Tree.insert(20);
    dt.Tree.insert(170);
    dt.Tree.insert(15);
    dt.Tree.insert(1);
    // console.log(dt.Tree._DFSInOrder());
    dt.Object.test = {
      test: 0
    }
    dt.Array.forEach(d=>{
      for (let i = 0; i < d.length; i++) {
         d[i] = "test"
      }
    })
  }) 
  return data;
}); 

function performancetest(test) {
  const to = performance.now()  ;
  const tests = test();
  const ti = performance.now()  ;
  console.log(tests, (ti - to).toFixed(4));
}

document.querySelector('button').addEventListener('click', ()=> KP.send(['sample', 'test'], 'test/routetwo.html'))
  

