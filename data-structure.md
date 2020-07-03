# Data-structure

## 数据结构

- 数组就是连续的地址的数据结构，那么知道了数组第一个元素的地址后，加7就得到第七个元素的地址。但是如果想在一个数组第一项里插入元素，就要移动后面的所有元素，所以以下几种操作的时间复杂度如下：获取指定元素 O(1),插入元素 O(n),删除元素 O(n)
- 链表，为了利用空间，我们使用链表结构，链表中每个节点里都存了下个地址的编号。但是此时如果想得到链表最后一个元素的内容，就需要从第一个节点走到最后一个。但是我们如果想在第一个元素前插入一个元素就会非常简单，只要让插入的元素的指向第一个元素即可。获取指定元素 O(n)，插入元素 O(1)，删除元素 O(1)。
- 哈希表，所谓的哈希函数就是输入一个字符串(这里意味着序列化的bytes)，输出一个number。我们可以认为他是字符串到数组的映射。哈希表需要有两个原则，输入相同输出也相同，不同的输入要有不同的输出。哈希函数把一个 name 映射为一个 inedx，所以我们需要用一个数组来存储数据，哈希函数能知道这个数组有多大，而且返回的index都是有效的，这个哈希函数和这个数组合在一起称之为哈希表
- 红黑树，红黑树是一棵平衡二叉搜索树 binarySearchTree，如果我们需要一棵平衡树频繁的插入和删除操作，那么红黑树是一个很好的选择。如果搜索要比插入和删除更多，那么我们需要AVL树。红黑树需要遵以下规则
  1. 每个节点是红的或黑的
  2. 根节点是黑的
  3. 所有叶子节点是黑的
  4. 如果一个节点是红的，那么他的两个孩子都是黑的
  5. 不存在两个相邻(adjacent)的红色节点，红色节点也不会有红色的父节点或子节点
  6. 从一个节点到任何子节点的每条路径都包含相同数量的黑色节点

## 二叉树，每个节点都有0～2个子节点

### 二叉搜索树，是一个二叉树，但是要满足 leftchild.value < value < rightchild.value

```javascript
// data structure
function BinarySearchTree() {

    var Node = function(key){ //{1}
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null; //{2}
}
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b36240c-fce0-48a8-9c7a-d84fbf0a032d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b36240c-fce0-48a8-9c7a-d84fbf0a032d/Untitled.png)

- 本来我们用指针代表树之间的链接
- 但是在树用语中指针叫 edges，节点叫 key
- 我们为树增加以下方法

### 二叉树的插入 insert(key) 在树中插入key

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68622edf-8452-4e0c-a472-f510f150b175/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68622edf-8452-4e0c-a472-f510f150b175/Untitled.png)

```javascript
this.insert = function(key) {
  var newNode = new Node(key);

  if(root === null) root = newNode;
  else insertNode(root, newNode);
}

function insertNode(node, newNode) {
  if(newNode.key < node.key) {
    if(node.left === null) node.left = newNode
    else insetNode(node.left, newNode);
  }else {
    if(node.right === null) node.right = newNode;
    else insertNode(node.right, newNode);
  }

}
```

### 二叉树的搜索 search(key) 在树中搜索key

```javascript
this.search = function(key) {
  return searchNode(root, key)
};

var searchNode = function(node, key) {
  if(node === null) return false;
  if(key < node.key) return searchNode(node.left, key)
  else if(key > node.key) return searchNode(node.right, key)
  else return true
}
```

### 二叉树的前序遍历 inOrderTraverse

```javascritp
this.inOrderTraverse = function(cb) {
  inOrderTraverse(root, cb);
}
var inOrderTraverse = function(node, cb) {
  if(node !== null) {
    cb(node.key);
    inOrderTraverse(node.left, cb);
    inOrderTraverse(node.right, cb);
  }
}
var printNode = function(v) {
  console.log(v);
}

tree.inOrderTraverse(printNode);
```

11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e70623b-f793-4d73-9bfa-400c94995b72/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e70623b-f793-4d73-9bfa-400c94995b72/Untitled.png)

### 二叉树的中序遍历，preOrderTraverse

```javascript
this.inOrderTraverse = function(cb) {
  inOrderTraverse(root, cb);
}
var inOrderTraverse = function(node, cb) {
  if(node !== null) {
    inOrderTraverse(node.left, cb);
    cb(node.key);
    inOrderTraverse(node.right, cb);
  }
}
var printNode = function(v) {
  console.log(v);
}

tree.inOrderTraverse(printNode);
```

3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4671bb3d-bcc9-48e9-a4bd-5c902c8d1759/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4671bb3d-bcc9-48e9-a4bd-5c902c8d1759/Untitled.png)

### 二叉树的后序遍历 postOrderTraverse

```javascript
// 与上面类似，只是变成了cb 在第三行
3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
```

- min：返回最小key

```javascript
// 最小节点在 左下角
this.min = function() {
  return minNode(root);
}

var minNoder = function(node) {
  if(node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node.key;
  }
  return null;
}
```

- max：返回最大key(与上面类似)
- remove(key): 移除key

## 树的递归遍历

```javascript
// 递归 深度遍历
var res = [];
var deepTravs = function(root) {
  if(root === null) return;
  res.push(root);
  deepTravs(root.left);
  deepTravs(root.right);
}

// 广度遍历
var res = [];
var queue = [root];
var broadTravs = function(root) {
  if(root === null) return;
  while(queue.length !==0) {
    var a = queue.shift();
    res.push(a);
    if(root.left) queue.push(root.left);
    if(root.right) queue.push(root.right);
  }
}
```

## 图

- 图是用于描述不同的事物是怎样连接的模型(model)
- 每个图都由节点nodes 和边 edges 组成
- 每个节点可以与多个其他的节点相连，称为邻居 neighbors
- 树是一种特殊类型的图，只是边是单向的
- 可以拓扑排序一个图，得到一个有序的 list
- 有向图(directed)表示关系是单向的
- 无向图(undirected)说明关系是双向的

```javascript
// 在JS 里表示图
graph = {}
graph["you"] = ["alice", "bob"];
graph["alice"] = ["tommy", "john"];
```

广度优先搜索 breadth-first search

广度优先是一种搜索算法，帮助解决两种类型的问题。

1. 节点 A 到节点 B 是否存在一条路径？
2. 如果存在，那么最短路径是什么？

举一个例子来说，如果你想在找人租房，那么

1. 你可以把你所有的朋友排成一个列表，从上到下询问它们是否要租房。
2. 如果他们不租，但是他们也有朋友，那么你就把他的朋友加入这个队列。
3. 两个结果：找到了 ，或者问完了也没找到。

### running time

- 搜索整个网络，那么需要走过每条边O(number of edges)
- 保存一个搜索的队列
    - 添加操作 O(1)
    - 每个人都要保存 O(number of people)
- 简写为 O(V+E) V 代表 vertices, E 代表 edges

### 实现

```javascript
function breadth_first_search(name, value) {
    let queue = [name];
    while(queue.length !== 0) {
        const item = queue.shift();
        if(item.value === value) return true;
        queue = [...queue, ...item.sub];
    }
  return false;
}
```

### BFS 广度优先

- 我们需要在第一次访问节点的时候跟踪它，并且还要去跟踪哪些还没有被 expolred 的节点
- 要完全的探索一个节点，我们需要遍历它的每一条路径，对于每个还未被访问到的节点，我们把它标记为 discoverd 然后放入list
- 当每个定点都被访问到的时候，那么每条路径和中间节点都会访问到了
  1. 白色代表没有 visited 过
  2. 灰色代表 visited 过但是没有 explored 过
  3. 黑色代表 explored 过

BFS 用于存储的数据结构是栈，把节点存在栈里，一直通过一条 path 访问到叶子节点

通过存储节点在队列里，最老的为被访问的节点最先被访问

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eed9e3a8-0807-4fe7-ae9c-ef3919317c59/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eed9e3a8-0807-4fe7-ae9c-ef3919317c59/Untitled.png)

1. 创建队列 q
2. 把根节点 v 标记成灰，把 v 插入进q
3. 如果 q 不空，执行：
    1.  从 q 中取出队列第一个元素 u
    2. 把 u 标记为 灰色
    3. 把所有 u 的白色邻居 w 放入队列q
    4. 把 u 标记为黑色

```javascript
var initializeColor = function() {
  var color = [];
  for (var i = 0; i < vertices.length; i++) {
    color[vertices[i]] = 'white'; // 1
  }
  return color;
}
```

### reference

- [https://learning.oreilly.com/library/view/learning-javascript-data/9781788623872/bf86e375-d4ca-4662-85ae-01b2349d7387.xhtml](https://learning.oreilly.com/library/view/learning-javascript-data/9781788623872/bf86e375-d4ca-4662-85ae-01b2349d7387.xhtml)
- [https://learning.oreilly.com/library/view/grokking-algorithms-an/9781617292231/kindle_split_012.html](https://learning.oreilly.com/library/view/grokking-algorithms-an/9781617292231/kindle_split_012.html)
