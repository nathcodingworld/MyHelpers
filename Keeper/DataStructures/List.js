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
}
Object.freeze(List)
