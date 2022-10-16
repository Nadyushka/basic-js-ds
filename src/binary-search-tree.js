const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
	constructor(data) {
		this.data = data;
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

		function addWithin(node, data) {
			if (!node) {
				return new Node(data);
			}

			if (node.data === data) {
				return node;
			}

			if (data < node.data) {
				node.left = addWithin(node.left, data);
			} else {
				node.right = addWithin(node.right, data);
			}

			return node;
		}

	}

	has(data) {

		function searchWithin(node, data) {
			if (!node) {
				return false;
			}

			if (node.data === data) {
				return true;
			}

			return data < node.data ?
				searchWithin(node.left, data) :
				searchWithin(node.right, data);
		}

		return searchWithin(this.top, data);
	}

	find(data) {

		function searchWithin(node, data) {
			if (!node) {
				return null;
			}

			if (node.data === data) {
				return node;
			}

			return data < node.data ?
				searchWithin(node.left, data) :
				searchWithin(node.right, data);
		}

		return searchWithin(this.top, data);
	}


	remove(data) {
		this.top = removeNode(this.top, data);

		function removeNode(node, data) {
			if (!node) {
				return null;
			}

			if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
			} else if (node.data < data) {
				node.right = removeNode(node.right, data);
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
				node.data = minFromRight.data;

				node.right = removeNode(node.right, minFromRight.data);

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

		return node.data;
	}

	max() {
		if (!this.top) {
			return;
		}

		let node = this.top;
		while (node.right) {
			node = node.right;
		}

		return node.data;
	}
}

module.exports = {
	BinarySearchTree
};