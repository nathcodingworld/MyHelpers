class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
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
    const newNode = new QueueNode(value);
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
Object.freeze(Queue)
