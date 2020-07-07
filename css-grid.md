# Css Grid

# Grid

display: grid;

## grid system

- 定义：在每一行拥有特定数量的列，比如12。
- `[class*="column-"]` { float: left; } 会匹配所有 column- 开头的类

### grid-template-columns

定义了每一个column 的size，用一个新单位 fr（fraction unit）有点类似flexbox 里面的flew-grow，设置 grid-template-columns: 1fr 1fr 1fr;  意味者有3列同样的size，也可以用 px为单位，此时1fr 将会填满剩下的空间

### grid-template-rows

它会定义出几个 grid tracks

### grid-gap

定义每个 grid cell 的 gutter，可以设置两个值个竖直和水平的

### Grid line

组成了 grid 的结构，一个 grid line 可以是竖直或水平，可以在行或列的一侧，如果定义有grid-gap，它在grid lines 的上面

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/28718b34-495c-4518-a00e-86af59dbe3fb/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/28718b34-495c-4518-a00e-86af59dbe3fb/Untitled.png) -->

### grid track

在两个 grid lines 之间的空间，可以有水平和竖直的

### grid cell

就是 竖直 grid track 和 水平 grid track 重叠的区域

### grid area

有一个或多个 grid cells 组成的矩形区域，这个区域在两个水平grid lines 和两个竖直 grid lines 之间

### Numbering grid lines

定义了 grid tracks 之后，浏览器设置 grid lines，只是可以用这些 grid nums 来放item，通过 grid-column 和 grid-row 属性。

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bb6a473b-f66a-4bbc-a174-8f89ddb66e87/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bb6a473b-f66a-4bbc-a174-8f89ddb66e87/Untitled.png) -->

### grid-column

(grid-column: 1/3;) 如果想让元素在column 上从 grid line 1一直到3就这样设置其实是 grid-column-start 和 grid-column-end 的简写；斜杠是为了分开两个值，前后两个值都是可选的

### grid-row

(grid-row: span 1;) span 是一个关键词，告诉浏览器这个item 会 span 1 个grid track;

### 其他属性

包括 justify-cotent/justify-items/justify-self/align-content/align-items/align-self

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6904fe4-e791-48db-88ba-127401acbdfd/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6904fe4-e791-48db-88ba-127401acbdfd/Untitled.png) -->

### 和flex区别

flexbox 一维，grid 二维；flexbox 是 content out，grid 是layout in;flex 适合在1行里进行处理

### implicit grid

可以每行的元素不固定，比如影集

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1c099dd7-d816-4a66-ad72-f5dd6bd8a824/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1c099dd7-d816-4a66-ad72-f5dd6bd8a824/Untitled.png) -->