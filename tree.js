//create class for creating new nodes
class Node {
  constructor(head, leftChild = null, rightChild = null) {
    this.head = head
    this.leftChild = leftChild
    this.rightChild = rightChild
  }
}
//create class for creating new trees
class Tree {
  #array
  #processedArray
  constructor(array) {
    this.#array = array
    this.#processedArray = this.#processArray(this.#array)
    this.root = buildTree(this.#processedArray, 0, this.#processedArray.length - 1)
  }
    //get processed array - sorted and without duplicates
  #processArray() {
    const sorted = this.#array.sort((a, b) => a - b)
    const withoutDuplicates = sorted.filter((elem, index, array) => {
      return array.indexOf(elem) == index
    })
    return withoutDuplicates
  }

  insert(value, current = this.root) {
    if (value < current.head) {
      if (!current.leftChild) current.leftChild = new Node(value)
      else {
        this.insert(value, current.leftChild)
      }
    }
    if (value > current.head) {
      if (!current.rightChild) current.rightChild = new Node(value)
      else {
        this.insert(value, current.rightChild)
      }
    }
  }

  delete(value) {
    let parent = null
    let current = this.root
    while(current.head !== value) {//looking for the node with the given value
      if (current.head > value) {
      parent = current
      current = current.leftChild
      }
      else if (current.head < value) {
      parent = current
      current = current.rightChild
      }
    }
    //when the needed node is found
    if (!current.rightChild && !current.leftChild)//when both children exist
      current.head < parent.head ? parent.leftChild = null: parent.rightChild = null
    else if (!current.rightChild) {//when only left child exists
      current.head = current.leftChild.head//change the value of the current node
      current.leftChild = null//...and remove node with the given value
    }
    else if (!current.leftChild) {//when only right child exists
    current.head = current.rightChild.head
    current.rightChild = null
    }
    else {//when both children exist
    current.head = findMin(current)//assign the min value of the right branch to current node
    }//and remove the old node wit same value

    function findMin (root) {
      let previous = root
      let current = root.rightChild
      while (current.leftChild) {
        previous = current
        current = current.leftChild
      }
      previous.leftChild = null//delete node with min value
      return current.head//return min value
    }
  }
  
  find(value, current = this.root) {
    if (current.head === value) return current
    if (current.head < value && current.rightChild) 
    return this.find(value, current.rightChild)
    if (current.head > value && current.leftChild)
    return this.find(value, current.leftChild)
  else return 'there is no nodes with such data'
  }

  levelOrderIter(callback) {
    const array = []
    const queue = [this.root]
    while (queue.length) {
      callback ? callback(queue[0].head) : array.push(queue[0].head)
      if (queue[0].leftChild) queue.push(queue[0].leftChild)
      if (queue[0].rightChild) queue.push(queue[0].rightChild)
      queue.shift()
    }
    if (!callback) return array
  }

  levelOrderRec(callback) {
    const array = []
    const queue = [this.root]
    const recursion = () => {
      if (!queue.length) return
      callback ? callback(queue[0].head) : array.push(queue[0].head)
      if (queue[0].leftChild) queue.push(queue[0].leftChild)
      if (queue[0].rightChild) queue.push(queue[0].rightChild)
      queue.shift()
      recursion()
    }
    recursion()
    if (!callback) return array
  }

  inOrder(callback) {
    const arrayOfValues = []
    const recursion = (current) => {
      if (!current) return
      recursion(current.leftChild)
      callback ? callback(current.head) : arrayOfValues.push(current.head)
      recursion(current.rightChild)
    }
    recursion(this.root)
    if (!callback) return arrayOfValues
  }

  preOrder(callback) {
    const arrayOfValues = []
    const recursion = (current) => {
      if (!current) return
      callback ? callback(current.head) : arrayOfValues.push(current.head)
      recursion(current.leftChild)
      recursion(current.rightChild)
    }
    recursion(this.root)
    if (!callback) return arrayOfValues
  }

  postOrder(callback) {
    const arrayOfValues = []
    const recursion = (current) => {
      if (!current) return
      recursion(current.leftChild)
      recursion(current.rightChild)
      callback ? callback(current.head) : arrayOfValues.push(current.head)
    }
    recursion(this.root)
    if (!callback) return arrayOfValues
  }

  height(node) {
    if (!node) return 0
    const leftChild = this.height(node.leftChild)
    const rightChild = this.height(node.rightChild)
    if (leftChild > rightChild) return leftChild + 1
    else return rightChild + 1
  }

  depth (value) {
    const recursion = (node) => {
      if (!node) return
      if (node === value) return 1
      const leftChild = recursion(node.leftChild)
      const rightChild = recursion(node.rightChild)
      if (leftChild) return leftChild + 1
      else if (rightChild) return rightChild + 1
    }
  return recursion(this.root) ?? 'there is no such node in the tree'
  }

  isBalanced(node = this.root) {
    if (!node) return true
  const leftHeight = this.height(node.leftChild)
  const rightHeight = this.height(node.rightChild)
  const difference = Math.abs(leftHeight - rightHeight)
  if (difference > 1) return false
  if (this.isBalanced(node.leftChild) && this.isBalanced(node.rightChild)) return true
  if (!this.isBalanced(node.leftChild) || !this.isBalanced(node.rightChild)) return false
  }
  
  rebalance() {
    const array = this.preOrder()//gather all values of unbalanced tree in array
    this.#array = array//in order to use function #processArray define array as this.#array
    const processed = this.#processArray(this.#array)//get sorted array
    this.root = buildTree(processed)//change unbalanced root to balanced
  }
}
//build root from ordinary array
function buildTree(array, start = 0, end = array.length - 1) {
  //base condition
  if (end < start) return null
  //get migPoint
  const midPointIndex = parseInt((end + start) / 2)
  const midPoint = array[midPointIndex]
  //get node and tree
  const node = new Node(midPoint)
  node.leftChild = buildTree(array, start, midPointIndex - 1)
  node.rightChild = buildTree(array, midPointIndex + 1, end)
return node
}
//this function graphically renders array
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.head}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}
//Tie it all together

//create function that returns an array of random numbers
function rundomArray(amount) {
  const array = []
  while (amount) {
    array.push(Math.floor(Math.random() * 99) + 1)
    amount -= 1
  }
return array
}
//create tree from array with the help of function rundomArray()
const myTree = new Tree(rundomArray(10))
//confirm that the tree is balanced by calling isBalanced()
console.log(myTree.isBalanced())//true
//print out all elements in level order with the help of iterrative...
myTree.levelOrderIter((number) => {
  console.log(number)
})
//... and recursive functions
myTree.levelOrderRec((number) => {
  console.log(number)
})
//preorder
myTree.preOrder((number) => {
  console.log(number)
})
//inorder
myTree.inOrder((number) => {
  console.log(number)
})
//postorder
myTree.postOrder((number) => {
  console.log(number)
})
//unbalance the tree by adding several numbers > 100
const firstUnbalanced = new Node(105)//create node for unbalancing (parent nod)
const secondUnbalanced = new Node(125)//create child node
firstUnbalanced.rightChild = secondUnbalanced//put child in parent
myTree.root.rightChild.rightChild.rightChild.rightChild = firstUnbalanced//put parent node into balanced node so later become unbalanced
//check if myTree node actually unbalanced
console.log(myTree.isBalanced())//false
//balance the tree by calling rebalance
myTree.rebalance()
//check if myTree node actually balanced now
console.log(myTree.isBalanced())//true

//one more time print out all elements in level order with the help of iterrative...
myTree.levelOrderIter((number) => {
  console.log(number)
})
//... and recursive functions
myTree.levelOrderRec((number) => {
  console.log(number)
})
//preorder
myTree.preOrder((number) => {
  console.log(number)
})
//inorder
myTree.inOrder((number) => {
  console.log(number)
})
//postorder
myTree.postOrder((number) => {
  console.log(number)
})
//end