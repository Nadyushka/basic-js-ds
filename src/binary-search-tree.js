const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {

	constructor() {
		this.top = null;
	}

	root() {
		return this.top;
	}


	add(data) {

		this.top = addWithin(this.top, data);

		function addWithin(node, value) {
			if (!node) {
				return new Node(value);
			}

			if (node.value === value) {
				return node;
			}

			if (value < node.value) {
				node.left = addWithin(node.left, value);
			} else {
				node.right = addWithin(node.right, value);
			}

			return node;
		}

	}

	has(data) {

		function searchWithin(node, value) {
			if (!node) {
				return false;
			}

			if (node.value === value) {
				return true;
			}

			return value < node.value ?
				searchWithin(node.left, value) :
				searchWithin(node.right, value);
		}

		return searchWithin(this.top, data);
	}

	find(data) {

		function searchWithin(node, value) {
			if (!node) {
				return null;
			}

			if (node.value === value) {
				return node.value;
			}

			return value < node.value ?
				searchWithin(node.left, value) :
				searchWithin(node.right, value);
		}

		return searchWithin(this.top, data);
	}


	remove(data) {
		this.top = removeNode(this.top, data);

		function removeNode(node, value) {
			if (!node) {
				return null;
			}

			if (value < node.value) {
				node.left = removeNode(node.left, value);
				return node;
			} else if (node.value < value) {
				node.right = removeNode(node.right, value);
				return node;
			} else {
				if (!node.left && !node.right) {
					return null;
				}

				if (!node.left) {
					node = node.right;
					return node;
				}

				if (!node.right) {
					node = node.left;
					return node;
				}

				let minFromRight = node.right;
				while (minFromRight.left) {
					minFromRight = minFromRight.left;
				}
				node.value = minFromRight.value;

				node.right = removeNode(node.right, minFromRight.value);

				return node;
			}
		}
	}

	min() {
		if (!this.top) {
			return;
		}

		let node = this.top;
		while (node.left) {
			node = node.left;
		}

		return node.value;
	}

	max() {
		if (!this.top) {
			return;
		}

		let node = this.top;
		while (node.right) {
			node = node.right;
		}

		return node.value;
	}
}

module.exports = {
	BinarySearchTree
};