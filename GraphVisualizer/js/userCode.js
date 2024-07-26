import { CoreCode } from "./core/coreCode.js";
import { console } from "./main.js";
import { graph, queue, stack } from "./main.js";
import { ColorIndex } from "./adt/graph.js";



export class UserCode extends CoreCode {

    /**
     * Toggles the colors of each node, if any
     */
    async toggleNodes() {
        for(const node of graph.nodes) {
            await this.step();
            node.toggleColor(1);
        }
        // for(let i = 0; i < graph.nodes.length; i++) {
        //     let node = graph.nodes[i];
        //     await this.step();
        //     node.toggleColor(1); 
        // }
    }

    /**
     * Toggles the colors of each edge, if any
     */
    async toggleEdges() {
        for(let i=0; i < graph.edges.length; i++) {
            await this.step();
            graph.edges[i].toggleColor(1);
        }
    }


    // async isSinglyLinkedList() {
    //     console.outln("Testing singly linked list");
    //     for(const node of graph.nodes) {
    //         for(const n of node.neighbors) {
    //             n.state_out++;
    //         }
    //     }

    //     let heads = graph.nodes.filter(n => n.state_out == 0); // filter all nodes with in-degree 0
    //     if (heads.length != 1) {
    //         return false;
    //     }

    //     for(const node of graph.node){
    //         for(const n of node.neighbors){
                
    //         }
    //     }
    //     return true;
    // }


    async isSinglyLinkedList() {
        console.outln("Testing singly linked list");
    
        for (const node of graph.nodes) {
            node.state_out = 0; // Reset state_out to count incoming edges
        }
        
        for (const node of graph.nodes) {
            for (const neighbor of node.neighbors) {
                neighbor.state_out++;
            }
        }
    
        // Step 2: Identify the head node (node with zero incoming edges)
        let heads = graph.nodes.filter(n => n.state_out == 0);//putting in the list "heads" only the nodes with 0 in-degree
        if (heads.length != 1) { //if there is only one node with 0 in-degree, that means that node is the head of the linked list and there are no other isolated nodes
            return false; 
        }
    
        // Step 3: Check that each node has at most one outgoing edge
        for (const node of graph.nodes) {
            if (node.neighbors.length > 1) {//if the nodes have the out-degree greater than 1, the graph is not a linked list; no need to test if the head has the out-degree 0 because we already checked it in the previous if state_outment
                return false; 
            }
        }
    
        return true;
    }
    
    async isDoublyLinkedList() {
        console.outln("Testing doubly linked list");
    
        //Counting incoming and outgoing edges for each node
        for (const node of graph.nodes) {
            node.state_out = 0; // Reset state_out to count incoming edges
            node.state_in = 0; // Reset state_in to count outgoing edges
        }
        for (const node of graph.nodes) {
            for (const neighbor of node.neighbors) {
                neighbor.state_out++; // Count incoming edges
                node.state_in++; // Count outgoing edges
            }
        }
    
        //Identifying head and tail nodes
        let heads = graph.nodes.filter(n => n.state_out == 1);
        let tails = graph.nodes.filter(n => n.state_in == 1);
        if (heads.length != 2 || tails.length != 2) {
            return false; // There should be exactly one head and one tail node
        }
    
        //Check that each node has at most one incoming edge and one outgoing edge
        for (const node of graph.nodes) {
            if(node.state_out!=1 && node.state_in!=1)
                if (node.state_out > 2 || node.state_in > 2) {
                    return false; // More than one incoming or outgoing edge
                }
        }
    
        return true;
    }
    

    // async isDoublyLinkedList() {
    //     console.outln("Testing doubly linked list");

    //     for (const node of graph.nodes) {
    //         node.state_out = 0; // Reset state_out to count incoming edges
    //     }

    //     for (const node of graph.nodes) {
    //         for (const neighbor of node.neighbors) {
    //             neighbor.state_out++;//counting the in-edges
    //         }
    //     }

    //     let inEdgesNodes = graph.nodes.filter(n => n.state_out == 2);
    //     if(inEdgesNodes.length != graph.nodes.length){
    //         return false;
    //     }


    //     let outEdgesNodes = graph.nodes.filter(n => n.neighbor.length == 2);
    //     if(outEdgesNodes.length != graph.nodes.length)
    //             return false;


    //     let head = graph.nodes.filter(n => n.state_out == 0);
    //     let tail = graph.nodes.filter(n => n.neighbor.length == 0);
    //     if(head.length!=1 && tail.length !=1){
    //         return false;
    //     }
    //     return true;
        
    // }
    
    async treeTravelTraversalQueue(){
        let root = graph.nodes.filter(n => n.colorIndex != 0)[0];//the root is going to be the node with a different color than default(gray color)
        root.toggleColor(1);
        await this.step();

        //Adding root the queue
        queue.clear();
        queue.enqueue(root);
        await this.step();


        while(queue.size() !=0){
            let node = queue.dequeue();
            node.toggleColor(1);
            console.out(node.label);
            await this.step();


            // Putting the children of the node in the queue
            // if(node.neighbors[0] != null){
            //     queue.enqueue(node.neighbor[0]);
            // }

            // if(node.neighbors[1] != null){
            //     queue.enqueue(node.neighbors[1]);
            // }


            // for(const n of node.neighbors){
            //     queue.enqueue(n);
            // }

            node.neighbors.forEach((n) => {queue.enqueue(n)});
        }

    }
  

    async treeTravelTraversalStack(){
        let root = graph.nodes.filter(n => n.colorIndex != 0)[0];//the root is going to be the node with a different color than default(gray color)
        root.toggleColor(1);
        await this.step();

        //Adding root the queue
        stack.clear();
        stack.push(root); //enque
        await this.step();


        while(stack.size() !=0){
            let node = stack.pop(); //deque
            node.toggleColor(1);
            console.out(node.label);
            await this.step();

            node.neighbors.reverse().forEach((n) => {stack.push(n)});



        }

    }


    //STILL NEED TO WORK HERE
    async treeTravelTraversalRecursive(node) {
        if (!node) return; // Base case: if the node is null, return
    
        node.toggleColor(1);
        console.log(node.label);
        await this.step();
    
        for (let neighbor of node.neighbors) {
            await treeTravelTraversalRecursive.call(this, neighbor);
        }
    }
    
    async  startTraversal() {
        let root = graph.nodes.filter(n => n.colorIndex != 0)[0]; // Find the root node
        await treeTravelTraversalRecursive.call(this, root);
    }



    async spanningTree() {
        let coloredNodes = graph.nodes.filter(n => n.colorIndex != 0);
        if (coloredNodes.length != 1) {
            console.outln("No root!");
            return;
        }
        let root = coloredNodes[0];
        root.toggleColor(1);
        queue.clear();
        queue.enqueue(root);
        await this.step();
        while(queue.size() != 0) {
            let node = queue.dequeue();
            node.colorIndex = ColorIndex.Red;
            await this.step();
            for (const n of node.neighbors) {
               if (n.colorIndex == ColorIndex.Gray) {
                  n.colorIndex = ColorIndex.Green;
                  let edge = graph.getEdge(node ,n);
                  edge.colorIndex = ColorIndex.Yellow;
                  queue.enqueue(n);
              }
            }
            await this.step();
            node.colorIndex = ColorIndex.Yellow;
        }
    }


    async runBFS() {
        // pick up inputs
        let coloredNodes = graph.nodes.filter((n) => n.colorIndex != 0);
        if (coloredNodes.length != 2) {
          console.outln("Incorrect input. Expect 2 colored nodes!");
          return;
        }
        coloredNodes = coloredNodes.sort((n1, n2) => n1.colorIndex - n2.colorIndex);
        let startNode = coloredNodes[0];
        let endNode = coloredNodes[1];
        startNode.colorIndex = ColorIndex.Blue;
        endNode.colorIndex = ColorIndex.Green;
        console.outln(
          `start=${startNode.label} (blue) end=${endNode.label} (green)`
        );
        // clear initial state
        graph.nodes.forEach((n) => {
          n.state = null;
        });
        queue.clear();
        queue.enqueue(startNode);
        startNode.state = startNode;
        // loop until queue empty
        while (queue.size() != 0) {
          let node = queue.dequeue();
          if (node != startNode && node != endNode) {
            node.colorIndex = ColorIndex.Magenta;
          }
          await this.step();
          for (const n of node.neighbors) {
            if (n.state != null) {
              continue;
            }
            n.state = node;
    
            queue.enqueue(n);
            graph.getEdge(node, n).colorIndex = ColorIndex.Yellow;
            if (n === endNode) {
              console.outln("End node is found!");
              queue.clear();
              break;
            }
            n.colorIndex = ColorIndex.Red;
            await this.step();
          }
        }
        let crtNode = endNode;
        while (crtNode != startNode) {
          graph.getEdge(crtNode, crtNode.state).colorIndex = ColorIndex.Green;
          if (crtNode != endNode) {
            crtNode.colorIndex = ColorIndex.Green;
          }
          await this.step();
          crtNode = crtNode.state;
        }
      }
    
      async runDijkstra() {
        // pick up inputs
        let coloredNodes = graph.nodes.filter((n) => n.colorIndex != 0);
        if (coloredNodes.length != 2) {
          console.outln("Incorrect input. Expect 2 colored nodes!");
          return;
        }
        coloredNodes = coloredNodes.sort((n1, n2) => n1.colorIndex - n2.colorIndex);
        let startNode = coloredNodes[0];
        let endNode = coloredNodes[1];
        startNode.colorIndex = ColorIndex.Blue;
        endNode.colorIndex = ColorIndex.Green;
        console.outln(`start=${startNode.label} (blue) end=${endNode.label} (green)`);

        // clear initial state
        graph.nodes.forEach((n) => {
          n.state = null;
          n.cost = Infinity;
        });
        queue.clear();
        queue.enqueue(startNode);
        startNode.state = startNode;
        startNode.cost = 0;
        // loop until queue empty
        while (queue.size() != 0) {
          let node = queue.dequeue();
          if (node != startNode && node != endNode) {
            node.colorIndex = ColorIndex.Magenta;
          }
          await this.step();
          for (const n of node.neighbors) {
            let newCost = node.cost + node.distance(n);
            if (n.cost < newCost) {
              continue;
            }
            n.state = node;
            n.cost = newCost;
            queue.enqueue(n);
            graph.getEdge(node, n).colorIndex = ColorIndex.Yellow;
            n.colorIndex = ColorIndex.Red;
            await this.step();
          }
        }
        let crtNode = endNode;
        while (crtNode != startNode) {
          graph.getEdge(crtNode, crtNode.state).colorIndex = ColorIndex.Green;
          if (crtNode != endNode) {
            crtNode.colorIndex = ColorIndex.Green;
          }
          await this.step();
          crtNode = crtNode.state;
        }
      }


    
  

    /**
     * Entry point for user-defined code.
     */
    async run() {
        console.outln("---- Starting user-defined code! ----");

        // console.out("Toggling nodes color ... ");
        // await this.toggleNodes();
        // console.outln("DONE");
        // await this.step();

        // console.out("Toggling edges color ... ");
        // await this.toggleEdges();
        // console.outln("DONE");
        // await this.step();

        //Tuesday
        // let var_isSinglyLinkedList = await this.isSinglyLinkedList();
        // if (var_isSinglyLinkedList) {
        //     console.outln("Yes, singly linked list!");
        // } else {
        //     console.outln("No, not a singly linked list!");
        // }


        // let var_isDoublyLinkedList  = await this.isDoublyLinkedList();
        // if (var_isDoublyLinkedList) {
        //     console.outln("Yes, dubly linked list!");
        // } else {
        //     console.outln("No, not a dubly linked list!");
        // }


        //Wednesday
        //await this.treeTravelTraversalQueue();
        //await this.treeTravelTraversalStack();
        //await this.startTraversal();

        //await this.spannigTree();

        await this.runDijkstra();
        console.outln("---- User-defined code ended! ----");

    }
}
