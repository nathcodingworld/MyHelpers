class TreeNode {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
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
Object.freeze(Tree)
