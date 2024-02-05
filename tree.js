class Node {
    constructor(head) {
      this.head = head
      this.leftChild
      this.rightChild
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
  
  const initialArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 34, 11, 2, 150]
  const tree = new Tree(initialArray)
  
//checking with the function prettyPrint
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
};

prettyPrint(tree.root)
  
  
  
    

  
  
  
  
