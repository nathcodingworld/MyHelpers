class DualDNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
class DualNode {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}
class SingleDNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
      prev: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new DualDNode(value);
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }
  prepend(value) {
    const newNode = new DualDNode(value);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
  }
  insert(index, value) {
    if (index >= this.length) {
      return this.append(value);
    }
    const newNode = new DualDNode(value);
    const leader = this._traverseToIndex(index - 1);
    const follower = leader.next;
    leader.next = newNode;
    newNode.prev = leader;
    newNode.next = follower;
    follower.prev = newNode;
    this.length++;
  }
  remove(index) {
    if (index < 0 || index >= this.size) return "Please Enter a valid index";
    else {
      let it = 0;
      let curr = this.head;
      let prev = curr;
      if (index === 0) this.head = curr.next;
      else {
        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }
        prev.next = curr.next;
      }
      this.size--;
      return curr.element;
    }
  }
  _traverseToIndex(index) {
    let counter = 0;
    let currentNode = this.head;
    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }
  reverse() {
    if (!this.head.next) {
      return;
    }
    let first = this.head;
    this.tail = this.head;
    let second = first.next;
    while (second) {
      const lastSecondNext = second.next;
      second.prev = null;
      second.next = null;
      first.prev = second;
      second.next = first;
      first = second;
      second = lastSecondNext;
    }
    this.head.next = null;
    this.tail.next = null;
    this.head = first;
  }
  printList() {
    const array = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log(array);
  }
}

class Graph {
  constructor() {
    this.numberOfNodes = 0;
    this.adjacentList = {};
  }
  addVertex(node) {
    this.adjacentList[node] = [];
    this.numberOfNodes++;
  }
  addEdge(node1, node2) {
    this.adjacentList[node1].push(node2);
    this.adjacentList[node2].push(node1);
  }
  showConnections() {
    const aDualDNodes = Object.keys(this.adjacentList);
    for (let node of aDualDNodes) {
      let nodeConnections = this.adjacentList[node];
      let connections = "";
      let vertex;
      for (vertex of nodeConnections) {
        connections += vertex + " ";
      }
      console.log(node + "-->" + connections);
    }
  }
}

class List {
  constructor() {
    this.length = 0;
    this.list = {};
  }
  get(index) {
    return this.list[index];
  }
  push(value) {
    this.list[this.length] = value;
    this.length++;
    return this.list;
  }
  pop() {
    delete this.list[this.length - 1];
    this.length--;
    return this.list;
  }
  pull(value) {
    for (let i = this.length; i > 0; i--) {
      this.list[i] = this.list[i - 1];
    }
    this.list[0] = value;
    this.length++;
  }
  shift() {
    for (let i = 0; i < this.length - 1; i++) {
      this.list[i] = this.list[i + 1];
    }
    delete this.list[this.length - 1];
    this.length--;
  }
  set(index, value) {
    if (typeof index !== "number") return "invalid index";
    for (let i = this.length; i >= index; i--) {
      this.list[i] = this.list[i - 1];
    }
    this.list[index] = value;
    this.length++;
    return this.list;
  }
  remove(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.list[i] = this.list[i + 1];
    }
    delete this.list[this.length - 1];
    this.length--;
  }
  slice(start, end) {
    if (start > end) return "start must be smaller than end";
    const toReturn = {};
    for (let i = start; i <= end; i++) {
      toReturn[i - start] = this.list[i];
    }
    return toReturn;
  }
  // sort(){
  //   return this._mergeSort(this.list)
  // }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  peek() {
    return this.first;
  }
  enqueue(value) {
    const newNode = new SingleDNode(value);
    if (this.last) {
      this.last.next = newNode;
      this.last = newNode;
    } else {
      this.last = newNode;
      this.first = newNode;
    }
    this.length++;
  }
  dequeue() {
    if (!this.first) return;
    if (this.length === 1) this.last = null;
    this.first = this.first.next;
    this.length--;
  }
  printList() {
    const array = [];
    let currentNode = this.first;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log(array, this.length);
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }
  peek() {
    return this.top;
  }
  push(value) {
    const newStack = new DualDNode(value);
    if (!this.bottom) {
      this.bottom = newStack;
      this.top = this.bottom;
    } else {
      const last = this.top;
      this.top.next = newStack;
      this.top = this.top.next;
      this.top.prev = last;
    }
    this.length++;
  }
  pop() {
    if (this.bottom === null) return;
    if (this.top.prev) {
      this.top = this.top.prev;
      this.top.next = null;
    } else {
      this.bottom = null;
      this.top = null;
    }
    this.length--;
  }

  printList() {
    const array = [];
    let currentNode = this.bottom;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log(array, this.length);
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new DualNode(value);
    if (this.root) {
      let location = this.root;
      while (true) {
        if (value < location.value) {
          if (!location.left) {
            location.left = newNode;
            break;
          }
          location = location.left;
        } else {
          if (!location.right) {
            location.right = newNode;
            break;
          }
          location = location.right;
        }
      }
    } else {
      this.root = newNode;
    }
  }
  lookup(value) {
    if (!this.root) return false;
    let location = this.root;
    while (location) {
      if (location.value > value) {
        location = location.left;
      } else if (location.value < value) {
        location = location.right;
      } else if (location.value === value) {
        return location;
      }
    }
    return false;
  }
  remove(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if (parentNode === null) {
            this.root = currentNode.right;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }
        } else {
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if (parentNode === null) {
            this.root = leftmost;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
        return true;
      }
    }
  }

  _BFS() {
    let currentNode = this.root;
    let list = [];
    let queue = [];
    queue.push(currentNode);
    while (queue.length > 0) {
      currentNode = queue.shift();
      list.push(currentNode.value);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return list;
  }
  _BFSR() {
    return this._RecursiveBFS([this.root], [], "BFSR");
  }
  _RecursiveBFS(node, list) {
    if (!node.length) return list;
    let currentNode = node.shift();
    list.push(currentNode.value);
    if (currentNode.left) node.push(currentNode.left);
    if (currentNode.right) node.push(currentNode.right);
    return this._RecursiveBFS(node, list);
  }
  _DFSInOrder() {
    return this._RecursiveDFSIn(this.root, []);
  }
  _DFSPostOrder() {
    return this._RecursiveDFSPost(this.root, []);
  }
  _DFSPreOrder() {
    return this._RecursiveDFSPre(this.root, []);
  }
  _Traverse(node, list, by, order) {
    switch (by) {
      case "BFSR":
        if (!node.length) return list;
        let currentNode = node.shift();
        list.push(currentNode.value);
        if (currentNode.left) node.push(currentNode.left);
        if (currentNode.right) node.push(currentNode.right);
        return this._Traverse(node, list, by);
      case "DFSR":
        if (order === "preOrder") list.push(node.value);
        if (node.left) this._Traverse(node.left, list, by, order);
        if (order === "inOrder") list.push(node.value);
        if (node.right) this._Traverse(node.right, list, by, order);
        if (order === "postOrder") list.push(node.value);
        return list;
    }
  }

  _RecursiveDFSPre(node, list) {
    list.push(node.value);
    if (node.left) this._RecursiveDFSPre(node.left, list);
    if (node.right) this._RecursiveDFSPre(node.right, list);
    return list;
  }
  _RecursiveDFSPost(node, list) {
    if (node.left) this._RecursiveDFSPost(node.left, list);
    if (node.right) this._RecursiveDFSPost(node.right, list);
    list.push(node.value);
    return list;
  }
  _RecursiveDFSIn(node, list) {
    if (node.left) this._RecursiveDFSIn(node.left, list);
    list.push(node.value);
    if (node.right) this._RecursiveDFSIn(node.right, list);

    return list;
  }
}


Object.freeze(List)
Object.freeze(Tree)
Object.freeze(Stack)
Object.freeze(Queue)
Object.freeze(Graph)
Object.freeze(LinkedList)