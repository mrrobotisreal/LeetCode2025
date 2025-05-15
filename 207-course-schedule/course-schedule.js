/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

// Create a function to calculate the in degree of each node and its neighbors
function getInDegree(graph) {
    // Create inDegree map for counting in degree of nodes
    const inDegree = new Map();

    // For each node in the graph, create the same node in inDegree initialized to a value of 0
    for (const node of graph.keys()) {
        inDegree.set(node, 0);
    }

    // For each node's neighbors in the graph, increment the inDegree for each neighbor
    for (const node of graph.keys()) {
        for (const neighbor of graph.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // Return calculated inDegree
    return inDegree;
}

// Create a function for topological sorting
function topoSort(graph) {
    // Create an array to collect results
    const results = [];
    // Create an empty queue
    const queue = [];
    // Get the graph's inDegree map
    const inDegree = getInDegree(graph);

    // For each node in inDegree, add it to the queue if it's in-degree is 0
    for (const node of inDegree.keys()) {
        if (inDegree.get(node) === 0) queue.push(node);
    }

    // While there's at least 1 or more items in the queue, do the following:
    while (queue.length > 0) {
        // Shift out the first node in the queue
        const node = queue.shift();
        // Since we already know all nodes in queue have 0 in degree, add node to results
        results.push(node);

        // For each neighbor of the current node in the graph, decrement its in-degree
        for (const neighbor of graph.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);

            // If its in-degree is 0, add it to the queue
            if (inDegree.get(neighbor) === 0) queue.push(neighbor);
        }
    }

    // If results length and graph size are equal, return results, otherwise there's a cycle and return null
    return (results.length === graph.size) ? results : null;
}

var canFinish = function(numCourses, prerequisites) {
    // Create a graph for collecting courses
    const graph = new Map();

    // For each index up to numCourses, use the index as a key and insert empty array for prereqs
    for (let i = 0; i < numCourses; i++) {
        graph.set(i, []);
    }

    // For each prereq, push it to course prereq array in graph
    for (const prereq of prerequisites) {
        graph.get(prereq[0]).push(prereq[1]);
    }

    // Get topologically sorted course schedule
    const schedule = topoSort(graph);

    // If schedule is not null AND its length is equal to numCourses, return true, otherwise return false
    return (schedule !== null && schedule.length === numCourses) ? true : false;
};