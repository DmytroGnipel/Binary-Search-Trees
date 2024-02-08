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
  
  const initialArray = [7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 34, 11, 2, 150]
  const tree = new Tree(initialArray)

  tree.delete(67, tree.root)
  
  //console.log(tree.root.leftChild)

  //console.log(tree.root.leftChild)
 
  
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

prettyPrint(tree.root)






  
  
  
    

  
  
  
  
