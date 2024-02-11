class Node {
  constructor(head, leftChild = null, rightChild = null) {
    this.head = head
    this.leftChild = leftChild
    this.rightChild = rightChild
  }
}

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
    }//and unfairly remove the old node wit same value

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
      recursion(current.rightChild)
      recursion(current.leftChild)
      callback ? callback(current.head) : arrayOfValues.push(current.head)
    }
    recursion(this.root)
    if (!callback) return arrayOfValues
  }
}

function buildTree(array, start, end) {
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
  
const initialArray = [7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 324, 34, 11, 2, 150]
const tree = new Tree(initialArray)

  //tree.delete(67, tree.root)
  
  //console.log(tree.root.leftChild)

  //console.log(tree.root.leftChild)
 
  //console.log(tree.find(34))

  /*tree.levelOrderIter(number => {
    console.log(number)
  })*/

  //console.log(tree.levelOrderIter())

  /*tree.levelOrderRec((number) => {
    console.log(number)
  })*/

//console.log(tree.preOrder())

/*tree.preOrder((node) => {
  console.log(node)
})*/

//console.log(tree.inOrder())

/*tree.inOrder((node) => {
console.log(node)
})*/

/*console.log(tree.postOrder())
tree.postOrder((node) => {
  console.log(node)
})*/


//check with the function prettyPrint()
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

//prettyPrint(tree.root)






  
  
  
    

  
  
  
  
