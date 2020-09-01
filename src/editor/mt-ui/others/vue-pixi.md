# vue-pixi-format 0.1

为了提高vue-pixi的表达能力, 决定移植一个较小的HTML子集到pixi中

## pixi-LESS 规则

- less式堆叠语法, 不支持& 参见https://less.bootcss.com/#%E5%B5%8C%E5%A5%97%EF%BC%88nesting%EF%BC%89
- pixi node的style属性
- flex布局相关属性
- 不做样式继承
- 盒模型: 标准盒模型, <!-- 带border(边框填充仅提供soild), --> padding, margin
- 选择器: 内联 > class > 标签 | 伪类(仅提供:hover :empty)

## 排版规则

默认为绝对定位, 可以简单搭建网格布局

可选flex布局, 文本应考虑使用flex布局实现, 当一个元素被设置为flex时, 子元素的x, y定位将失效, flex元素必须指定主轴方向长度, 以便于计算, 具体规则参见http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

flex-direction 决定主轴的方向（即项目的排列方向
flex-wrap 是否换行
<!-- flex-flow 即上两者的简写 暂时不提供 -->
justify-content 项目在主轴上的对齐方式
align-items 项目在交叉轴上如何对齐
align-self 允许单个项目有与其他项目不一样的对齐方式
align-content 有换行时多根轴线的对齐方式

## 实现方式

首先仿照浏览器dom构建dom树, 每个dom对应绑定一个或多个pixi node

所有组件需要连接到一个标签为root的组件, 所有组件的less规则(包括该组件自身的) 均集中到此处, 同时该组件内以dfs序维持所有子sprite的索引, 提供getElementsByTagName, getElementsByClassName 方法, 子元素的getElements方法均转发至此, 由于以dfs序维持, 线性查找子序列即可返回

在此基础上改造目前已有的css选择器库

当一条css属性被加入时, 对所有节点进行匹配, 并attach到节点上
当节点加入, class变化时, 遍历所有css规则进行匹配
当一个节点满足的css规则变化时, 进行重算, 重算得到的结果放入dom的computed style中, 并对应渲染pixi node
特别的, 当width, height, margin, padding, <!-- border --> 属性变化时, 检查父元素是否是flex元素, 是则进行重排
