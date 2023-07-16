class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
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
    const newStack = new StackNode(value);
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
Object.freeze(Stack)
