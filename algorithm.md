# Algorithm

## 二分查找 binary search

我们都了解一个最朴素的二分查找，翻一本字典，从A-Z，但是没有目录。为了查找到指定的单词，首先从字典中间的页开始找起，每次都翻到剩下部分的中间页，很快就能找到我们想要的任何单词，这就是二分查找。

这里可以看出二分查找的条件：查找的内容必需是已经排好序的。

### 大O标记法 Big O notion

我们说二分查找算法的时间复杂度是 O(logn)，log以2为底的对数。意思是说针对二分查找这个算法，如果我们要查找n个元素，在最最坏的情况下，要找 log n 次。

我们使用大O标记法来表示，n 的意思是有n个数量的 operations (比如说包含n个数量的查找)，Big 是说用大写字母，O是指Order of Complexity(复杂程度)。我们既可以用它来标记时间，也可以用来标记空间。

大O标记法 并不能知道算法花费多长时间，而是告诉你随着 n 的增长，时间是以什么样的程度增长的。是对数的O(log n)、线性的O(n)、还是O(n!)的。

```javascript
function binarySearch(list, item) {
  let low = 0; // 字典的第一页
  let high = list.length - 1; // 字典的最后一页

  while(low <= high) { // 开始翻字典
    let mid = Math.floor(low + high) / 2; // (1) 字典的中间一页，向下取整
    let guess = list[mid]; // 中间一页的单词

    if(guess === item) return mid; // 找到了单词
    if(guess > item) high = mid - 1; // 想找的在前半本，那么把后半本字典扔掉
    else if(guess < item) low = mid + 1; // 想找的在后半本，那么把前半本扔掉
  }

  return -1; // 找完了也没找到单词
}

// (1) 中间一页如果除完了不是整数，那么向上或向下取整都可以
// 向下取整的举例
// 以一个数组 [1,2,3,4]，要找到 4，也就是需要返回的返回值为 3 
// 1. low = 0, high = 3, mid = 1.5 向下取整后得到 mid = 1，继续向右
// 2. low = 2，high = 3，mid = 2.5 向下取整后 mid = 2，继续向右
// 3. low = 3，high = 3，mid = 3 可以返回了
```

### 选择排序

选择排序的概念非常简单，我们有俩数组，左边数组是排序的，右边数组是空的。

我们每次都选择左边里的最小元素，移入右边，执行n次后，左边就空了。时间复杂度是O(n)

```javascript
let unsort_array = [1,7,5,3];
let sorted_array = [];

while(unsort_array.length > 0) {
  let min = Math.min(...unsort_array); 
  let index = unsort_array.indexOf(min);
  const item = unsort_array.splice(index, 1); // 移除 index 里面的那一项
  sorted_array.push(...item); // item是一个数组
}
```

### 递归 rescursion

- 函数调用自己的行为，就叫做递归
- 递归函数里必需要有退出条件

### 分治 divide and conqur

我们举一个例子来理解分治，一个农场主有长 1680 m 宽640m 的土地，想把它们等分为正方形的块儿，那么地块儿最大是多少米，分治的思路是下面这样的

- 1680 - 640 * 2 = 400 此时剩余长为640，宽为 400
- 640 - 400 = 240 此时剩余长为 240 宽为 80 的矩形
- 240 - 80 * 3 = 0 此时不剩余，所以宽度最大为80

所以分治一共需要两步

1. 用一个简单的方案作为 base case
    - 简单方案就是说如果农场主的地是 240*80 的矩形，我们立刻就知道答案是 80 m
2. 把问题逐步缩小为 base case
    - 如何缩小问题需要视情况，上面的问题我们每次把短边长的正方形去掉，就可以了
    - 思考一下，我们下面使用了每次移除最多个正方形，其实每次移除一个也是可以的

```javascript
// 代码实现，长的边为 long 短的边为 short
function getMaxLand(long, short) {
  const maxCount = Math.floor(long / short); // 以短边作为变长的正方形的最大个数
  let shortter = long - short * maxCount; // 剩余矩形的短边边长
  if(shortter === 0) return console.log(short); // base case 分割完毕的退出条件
  getMaxLand(short, shortter); // 未分割完毕，那么对更小的区域实行同样的方法
}
getMaxLand(1680, 640)
```

注意分治是一种解决问题的方式，我们前面的二分查找，就是利用分治的思路。那么下面我们再来一个练习，用分治来对一个数组求和。

用分治的思路分析

- 用一个简单的方案作为 base case
    - 最简单的方案就是数组只有一个元素，那么该元素就是数组的和
- 逐步把问题缩小为 base case

```javascript
function getSum(array) {  
  if(array.length === 1) return array[0];
  const item = array.shift();
  return item + getSum(array);
}
  const sum = getSum([1,2,3,4]);
console.log(sum);
```

### 快排

说明一个比较高效的数组的排序方法，quickSort。

用分治的思路分析快排

- 用一个简单的方案作为 base case
    - 如果数组有0个或1个元素，我们不用排序，直接返回就行了
    - 如果考虑两个元素，直接比较一下返回正确的顺序就行了
- 逐步把问题缩小为 base case
    - 如果有三个元素 3 9 6，我们引入中间元素 pivot，让它指向9
        1. 我们把 pivot 指向9，所有剩下的元素和它比较，小的放入[less]，大的放入 [more]，那么此时[less]为3,6， [more] 里面是 []
        2. 同时，我们对 [less] 和 [more] 也使用快排，也就是说qSort([3,6,9]) == qQsort([3,6]) + 9 + qSort([])
        3. 此时我们把这个数组变成了对于0个元素和两个元素的排序

```javascript
function qSort(array) {
  const len = array.length;
  if(len === 0 || len === 1) return array;
  if(len === 2) return array[0] > array[1] ? array.reverse() : array;
  
  const pivot = array[Math.floor(len / 2)];
  let less = [];
  let more = [];
  for(let i = 1; i< array.length; i++) {
    const item = array[i];
    if(item >= pivot) more.push(item);
    else less.push(item);
  }
  return [...qSort(less), pivot, ...qSort(more)];
}
var res = qSort([1,7,45,5435,342,13213,1]);
console.log(res);
```

思考一下：写完了上线的代码，有几个地方可以进行优化

1. 我们发现其实不用去刻意判断2个元素情况，对于两个元素，执行快排的思路也可以，所以第四行的代码可以删除掉。
2. 除了上面两点，上面的算法每次都 less 和 more 数组，占用了一些空间，那么我们能不能不创建新的数组就完成排序呢，当然可以。

### 最终版本的快排

在我们可以使用额外空间的时间，我们选取一个中间值pivot，把小于他的放入less，大于它的放入more。

当我们不能使用额外空间的时候，我们还是选取一个处于中间位置的值 pivot，只不过这时分治的策略有所变化，通过交换元素，我们要实现，把数组分成两个部分，左边的都小于等于 pivot，右边的都大于等于pivot，这样就把问题缩小了。

针对数组 items = [1,3,5,0,7,9]，我们可以创建两个数组的索引 i = 0, j = 5，和一个中间值 pivot = 5。

1. i 索引从左向右移动，直至找到第一个大于或等于pivot的元素
    - 当我们停止移动i的时候，就说明 i 左边的元素全都比 pivot 小

    ```javascript
    while(items[i] < pivot) i++;
    ```

2. j 索引从右向左移动，直至发现第一个小于或等于pivot的元素

    ```javascript
    while(items[j] > pivot) j--;
    ```

3. 当找到之后，我们把这两个元素交换位置，交换后，移动 i 和 j

    ```javascript
    if (i <= j) {
        swap(items, i, j);
        i++;
        j--;
    }
    ```

4. 当我们一直移动到 i > j 的时候，数组会被分成左右两半

```javascript
// 交换元素
function swap(items, left, right) {
  const temp = items[left];
  items[left] = items[right];
  items[right] = temp;
}
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) { i++; }
        while (items[j] > pivot) { j--; }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function qSort(items, left, right) {
  if(items.length > 1) {
    const index = partition(items, left, right);
    if(left < index - 1) {
      qSort(items,left, index - 1)
    }
    if(right > index) {
      qSort(items,index, right)
    }
  }
  return items;
}
var res = qSort([1,7,2,4,5,7,8], 0, 6);
console.log(res);
```