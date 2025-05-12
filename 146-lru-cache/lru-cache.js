/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    // Set the capacity
    this.capacity = capacity;
    // Create our cache (hash map)
    this.cache = new Map();

    // Create dummy Least Recently Used node, i.e. head
    this.head = new Node(0, 0);
    // Create dummy Most Recently Used node, i.e. tail
    this.tail = new Node(0, 0);

    // Doubly link the LRU and MRU to each other
    this.head.next = this.tail; // head is LRU and next is tail, the MRU
    this.tail.prev = this.head; // tail is MRU and prev is head, the LRU
};

// Helper class function to hold key, value, next node link, and prev node link
function Node(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    // If the key does not exist, return -1
    if (!this.cache.has(key)) return -1;

    // The node must exist, get it from the cache
    const node = this.cache.get(key);

    // Remove the node from its current position
    this.removeNode(node);
    // Move it to the front (MRU) since it's been used
    this.addToFront(node);

    // Return the node's value
    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // If the cache already has an entry the same as the new key,
    if (this.cache.has(key)) {
        // then get this node from the cache
        const node = this.cache.get(key);
        // reassign it's value to be the new value provided
        node.value = value;
        // Again, remove it from its current position
        this.removeNode(node);
        // Move it to the front (MRU) since it's now been updated
        this.addToFront(node);
        // Return early to prevent further changes
        return;
    }

    // If we've reached or are about to exceed capacity,
    if (this.cache.size >= this.capacity) {
        // then get the LRU node (head, but we want to grab it from tail.prev, not directly head)
        const lruNode = this.tail.prev;
        // now we remove the LRU node to make room for the new incoming node
        this.removeNode(lruNode);
        // we also need to delete it from the cache itself, not just the lru node
        this.cache.delete(lruNode.key);
    }

    // Create the new node with the provided key and value
    const newNode = new Node(key, value);
    // Add the newly created node to the front (MRU) since we've just added it
    this.addToFront(newNode);
    // And of course, add this newly created node to the cache
    this.cache.set(key, newNode);
};

// Create helper function to remove a node from its current position
LRUCache.prototype.removeNode = function(node) {
    // Remove and doubly link
    node.prev.next = node.next;
    node.next.prev = node.prev;
}

// Create helper function to move a node to the front (MRU)
LRUCache.prototype.addToFront = function(node) {
    // Move to the node to the front (MRU)
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */