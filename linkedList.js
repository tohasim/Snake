"use strict";

class LinkedList {
	constructor() {
		this.tail = null;
		this.head = null;
	}

	dumpList() {
		let a_node = this.head;
		if (this.head == null) {
			console.log("List empty");
		} else {
			console.log(`
        list:
            - head: ${this.head.data}
            - tail: ${this.tail.data}`);
			while (a_node != null) {
				console.log(`
                node: ${a_node.data}
                -----------
                prev: ${a_node.prev?.data}
                next: ${a_node.next?.data}
                `);
				a_node = a_node.next;
			}
		}
	}

	get(index) {
		if (index > this.size() - 1) {
			console.log("Index out of bounds");
			return;
		}
		let nodeToFind = this.head;
		for (let i = 0; i < index; i++) {
			nodeToFind = nodeToFind.next;
		}
		if (nodeToFind == null) console.log("List empty");
		else return nodeToFind;
	}

	add(value) {
		this.addLast(value);
	}

	addLast(value) {
		const newNode = { prev: null, next: null, data: value };
		newNode.prev = this.tail;
		if (this.tail != null) {
			this.tail.next = newNode;
		} else {
			this.head = newNode;
		}
		this.tail = newNode;
		// this.dumpList();
	}

	addFirst(value) {
		const newNode = { prev: null, next: null, data: value };
		if (this.head != null) {
			newNode.next = this.head;
			this.head.prev = newNode;
		} else {
			this.tail = newNode;
		}
		this.head = newNode;
		// this.dumpList();
	}

	indexOf(node) {
		let currNode = this.head;
		let index = 0;
		while (currNode != node) {
			currNode = currNode.next;
			index++;
		}
		return index;
	}

	first() {
		return this.head;
	}

	last() {
		return this.tail;
	}

	clear() {
		let currNode = this.head;
		while (currNode != this.tail) {
			currNode = currNode.next;
			this.remove(currNode.prev);
		}
		this.head = null;
		this.tail = null;
		// this.dumpList();
	}

	removeLast() {
		if (this.tail == null) {
			console.log("List already empty");
		} else {
			if (this.tail.prev != null) {
				this.tail = this.tail.prev;
				this.tail.next = null;
			} else {
				this.tail = null;
				this.head = null;
			}
			// this.dumpList();
		}
	}

	removeFirst() {
		if (this.head == null) {
			console.log("List already empty");
		} else {
			if (this.head.next != null) {
				this.head = this.head.next;
				this.head.prev = null;
			} else {
				this.tail = null;
				this.head = null;
			}
			// this.dumpList();
		}
	}

	size() {
		let counter = 1;
		let node = this.head;
		while (node.next != null) {
			counter++;
			node = node.next;
		}
		return counter;
	}

	swapNodesAtIndex(a, b) {
		const nodeA = this.get(a);
		const nodeB = this.get(b);
		this.swapNodes(nodeA, nodeB);
	}

	swapNodes(nodeA, nodeB) {
		const containerNodeData = nodeA.data;
		nodeA.data = nodeB.data;
		nodeB.data = containerNodeData;
		// this.dumpList();
	}

	remove(index) {
		const nodeToDelete = this.get(index);
		this.removeNode(nodeToDelete);
	}

	removeNode(nodeToDelete) {
		if (nodeToDelete == null) console.log("List empty");
		else {
			if (nodeToDelete.prev == null && nodeToDelete.next == null) {
				this.head = null;
				this.tail = null;
			} else if (nodeToDelete.prev == null) {
				nodeToDelete.next.prev = null;
				this.head = nodeToDelete.next;
			} else if (nodeToDelete.next == null) {
				nodeToDelete.prev.next = null;
				this.tail = nodeToDelete.prev;
			} else {
				nodeToDelete.prev.next = nodeToDelete.next;
				nodeToDelete.next.prev = nodeToDelete.prev;
			}
			// this.dumpList();
		}
	}

	contains(node) {
		let currentNode = this.head;
		while (currentNode != null) {
			if (
				currentNode.data.row === node.row &&
				currentNode.data.col === node.col
			)
				return true;
			currentNode = currentNode.next;
		}
		return false;
	}

	insertBeforeNode(payload, existingNode) {
		if (!ll.contains(existingNode)) {
			console.log(`Node ${existingNode.data} not found`);
		} else {
			if (existingNode.prev != null) {
				payload.prev = existingNode.prev;
				existingNode.prev.next = payload;
			} else {
				this.head = payload;
			}
			existingNode.prev = payload;
			payload.next = existingNode;
		}
		// this.dumpList();
	}

	insertAfterNode(payload, existingNode) {
		if (!ll.contains(existingNode)) {
			console.log(`Node ${existingNode.data} not found`);
		} else {
			if (existingNode.next != null) {
				payload.next = existingNode.next;
				existingNode.next.prev = payload;
			} else {
				this.tail = payload;
			}
			existingNode.next = payload;
			payload.prev = existingNode;
		}
		// this.dumpList();
	}

	insertBefore(index, value) {
		if (index > this.size() - 1) {
			console.log("Index out of bounds");
			return;
		}
		let node = this.get(index);
		let nodeToAdd = { prev: null, next: prev, data: value };
		if (node.prev != null) {
			nodeToAdd.prev = node.prev;
			node.prev.next = nodeToAdd;
		} else {
			this.head = nodeToAdd;
		}
		node.prev = nodeToAdd;
		nodeToAdd.next = node;
		// this.dumpList();
	}

	insertAfter(index, value) {
		if (index > this.size() - 1) {
			console.log("Index out of bounds");
			return;
		}
		let node = this.get(index);
		let nodeToAdd = { prev: null, next: prev, data: value };
		if (node.prev != null) {
			nodeToAdd.prev = node.prev;
			node.prev.next = nodeToAdd;
		} else {
			this.head = nodeToAdd;
		}
		node.prev = nodeToAdd;
		nodeToAdd.next = node;
		// this.dumpList();
	}
}

export default LinkedList;
