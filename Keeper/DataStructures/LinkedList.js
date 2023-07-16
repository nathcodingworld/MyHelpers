class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
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
    const newNode = new LinkedListNode(value);
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }
  prepend(value) {
    const newNode = new LinkedListNode(value);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
  }
  insert(index, value) {
    if (index >= this.length) {
      return this.append(value);
    }
    const newNode = new LinkedListNode(value);
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
Object.freeze(LinkedList)
