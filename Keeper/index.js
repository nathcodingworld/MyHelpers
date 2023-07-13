// const aa = {test:['asd','aasd']}
// const bb = JSON.stringify(aa)
// console.log(encodeURIComponent(bb));
// const test = window.location.search
// const s = new URLSearchParams(test);
// const q = s.get("q")
// console.log(q);

const KP = new Keeper();
KP.makeSpace("test", ["t1", "t2"]);
KP.makeSpace("aff", ["ta1", "ta2"]);
KP.makeSpace("daa", ["td1", "td2"]);
 
 

const test = new List();
[1, 45, 34, 23, 43, 11, 22, 12, 41, 14, 18].forEach((item) => {
  test.push(item);
});

function performancetest(test) {
  const to = performance.now();
  const tests = test();
  const ti = performance.now();
  console.log(tests, ti - to);
}
const to = performance.now();
const log = test.slice(0, 5);
const tm = performance.now();
const com = [1, 45, 34, 23, 43, 11, 22, 12, 41, 14, 18].slice(0, 5);
const ti = performance.now();

console.log(log, tm - to);
console.log(com, ti - tm);

const myQueue = new Queue();
myQueue.enqueue("joy");
myQueue.enqueue("enrik");
myQueue.enqueue("jobert");
myQueue.dequeue();
myQueue.dequeue();
myQueue.enqueue("sara");
myQueue.printList();

const myGraph = new Graph();

myGraph.addVertex("0");
myGraph.addVertex("1");
myGraph.addVertex("2");
myGraph.addVertex("3");
myGraph.addVertex("4");
myGraph.addVertex("5");
myGraph.addVertex("6");
myGraph.addEdge("3", "1");
myGraph.addEdge("3", "4");
myGraph.addEdge("4", "2");
myGraph.addEdge("4", "5");
myGraph.addEdge("1", "2");
myGraph.addEdge("1", "0");
myGraph.addEdge("0", "2");
myGraph.addEdge("6", "5");

myGraph.showConnections();

const myLinkedList = new LinkedList(10);
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.prepend(1);
myLinkedList.insert(1, 99);
myLinkedList.insert(20, 88);
myLinkedList.remove(1);
myLinkedList.reverse();
myLinkedList.remove(2);

myLinkedList.printList();
console.log(myLinkedList.head.next.next.prev.value);

const myStack = new Stack();
myStack.push("Discord");
myStack.push("Udemy");
myStack.push("google");
myStack.printList(); 

function traverse(node) {
    const tree = { value: node.value };
    tree.left = node.left === null ? null : traverse(node.left);
    tree.right = node.right === null ? null : traverse(node.right);
    return tree;
  }
  
  const myTree = new Tree();
  myTree.insert(9);
  myTree.insert(4);
  myTree.insert(6);
  myTree.insert(20);
  myTree.insert(170);
  myTree.insert(15);
  myTree.insert(1);
  const tto = performance.now();
  const tlog = myTree._DFSInOrder();
  const tti = performance.now();
  // const log = JSON.stringify(traverse(myTree.root));
  
  console.log(tlog, tti - tto);
  