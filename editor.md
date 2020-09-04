# 文档编辑器功能概述

文档编辑器由两部分组成, 左边为组织视图, 右边是接口信息的编辑器

## 数据格式

文档编辑器编辑的信息以json格式存储

```json
{
    "projectInfo": {
        "title": "水水水", // 项目名称
        "index": "mota.pw", // 项目首页啥的
        "github": "github.com/tensforest/mota.pw", // git页面,
        "intro": "这是个水项目" // 项目介绍
    },
    "globals": {
        "baseURL": "mota.pw/water", // 基准URL
        "tags": [
            {
                "id": "114514", // <- 唯一的标识符
                "comment": "xxxx", // 注释
                "name": "用 户", // 名称
                "meta": { // 生成信息
                    "filename": "user"
                }
            }
        ],
        "mixins": [

        ]
    },
    "document": [
        {
            "id": 1, // 接口id, 只有内部有
            "name": "xxxx", // 名称
            "uri": "/user/{id}", // 标识符, 可以用{xxx}这种形式捕获?
            "method": "POST", // 请求类型
            "content-type": "xxxx",
            "headers": { // 请求头

            },
            "requestParams": { // 请求类型
                "aaa": {
                    "type": "array", // 对于array, 描述元素类型
                    "subtype": "@info", // 用@xxx调用自定义类型
                    "required": false, // <- 
                    "comment": "啊啊啊" // 每个参数的注释
                },
                "bbb": {
                    "type": "string",
                    "comment": "get"
                }
            },
            "response": {
                "code": {
                    "type": "int", 
                    "enum": [1, 2, 3], // 数字/字符串类型可以枚举
                    "comment": "1代表成功"
                }
            },
            "comment": "rua, 不要啊", // 接口注释
            "tag": "114514", // 接口属于的功能组
            "meta": { // 各个语言生成时使用的信息
                "java.class": "userxxx" 
            },
            "mixin": [ // 混入的公共信息
                "1919810"
            ]
        }
    ],
    "types": { // 自定义类型存在此处
        "info": {
            "type": "object",
            "props": {
                "aaa": "string", // 基础类型可以简写
                "bbb": {
                    "type": "array",
                    "subtype": "int"
                }
            }
        }
    }
}
```

## 组织视图概要

组织视图用于管理各个视图, 提供根据uri和功能tag进行组织的形式, 也可以调用接口自己添加新的source, 点击一个子标签可以跳转到对应的生成信息

## 接口编辑器概要

接口编辑器用于具体编辑每个接口的信息

## 首页

接口编辑器需要一个首页, 包含项目基本信息等

## 公共类型功能

编辑器中可以声明公共类型, 公共类型可以展开为普通类型, 公共类型必须跳转到公共类型编辑界面进行编辑

## mixin

每个接口可以混入公共信息, 包括公共的请求和回应信息, meta等

## meta

每个接口可以包含一些meta信息, 在进行代码生成时可以读取meta进行一些特殊操作

## 代码生成

文档编辑器允许将接口信息生成为指定的代码

可以使用指定的生成器完成, 每个生成器具有一个可以生成的语言的标签, 生成器由js编写

文档生成器内置一系列库辅助代码生成器的编写, 包括注释生成器, 类型转换等

## 元编辑器功能

接口编辑器需要是可元编辑的, 因此整体信息最好能以json格式给出

## 主题功能

文档编辑器可以选择主题配色, 配色文件格式同vscode

```json
"colors": {
    "activityBar.background": "#e0e0e0",
    "activityBar.foreground": "#000000",
    "editor.background": "#c8c8c8",
    "editor.foreground": "#000000",
    "editor.findMatchBackground": "#ffff00",
    "editor.findMatchHighlightBackground": "#ffff00",
    "editor.lineHighlightBackground": "#c0c0c0",
    "editor.selectionBackground": "#b0b0b0",
    "editor.selectionHighlightBackground": "#dfdfdf",
    "editor.rangeHighlightBackground": "#b0b0b0",
    "editorBracketMatch.background": "#b0b0b0",
    "editorCursor.foreground": "#333333",
    "editorGutter.background": "#d3d3d3",
    "editorLineNumber.foreground": "#777777",
    "sideBar.background": "#f5f5f5",
    "sideBar.foreground": "#000000",
    "sideBarSectionHeader.background": "#e0e0e0",
    "statusBar.background": "#444444",
    "statusBar.noFolderBackground": "#444444",
    "statusBar.debuggingBackground": "#444444",
    "tab.activeBackground": "#afafaf",
    "tab.activeForeground": "#000000",
    "tab.inactiveBackground": "#e0e0e0",
    "tab.inactiveForeground": "#000000",
    // Other colors.
    "activityBarBadge.background": "#705697",
    "button.background": "#705697",
    "dropdown.background": "#F5F5F5",
    "editorGroup.dropBackground": "#C9D0D988",
    "editorWhitespace.foreground": "#AAAAAA",
    "focusBorder": "#A6B39B",
    "inputOption.activeBorder": "#adafb7",
    "inputValidation.infoBorder": "#4ec1e5",
    "inputValidation.infoBackground": "#f2fcff",
    "inputValidation.warningBackground": "#fffee2",
    "inputValidation.warningBorder": "#ffe055",
    "inputValidation.errorBackground": "#ffeaea",
    "inputValidation.errorBorder": "#f1897f",
    "list.activeSelectionForeground": "#6c6c6c",
    "list.focusBackground": "#CADEB9",
    "list.activeSelectionBackground": "#c4d9b1",
    "list.inactiveSelectionBackground": "#d3dbcd",
    "list.highlightForeground": "#9769dc",
    "notification.background": "#442e66",
    "panel.background": "#F5F5F5",
    "peekViewEditor.matchHighlightBackground": "#C2DFE3",
    "peekViewTitle.background": "#F2F8FC",
    "peekViewEditor.background": "#F2F8FC",
    "peekViewResult.background": "#F2F8FC",
    "peekView.border": "#705697",
    "peekViewResult.matchHighlightBackground": "#93C6D6",
    "pickerGroup.foreground": "#A6B39B",
    "pickerGroup.border": "#749351"
}
```

## 预览功能

文档编辑器可以展示为一个文档, 在展示为文档时, 不可进行编辑, 不显示编辑控件
(可能) 在右上角显示github标记

文档可以选择语言, 若选择语言, 则对应的

## diff功能

文档编辑器可以diff两个json文件, 包括

1. 在组织视图上以类似vscode的形式显示 新增, 删除, 修改 三种状态
2. 在接口编辑器中, 在每个可修改项的左侧显示类似于vscode的蓝线和绿线

## 模板功能

新建时从预设的模板生成, 预设模板可能需要单独的编辑页面

## 组织视图功能总结

组织视图是一个treeview, 由mt-tree组件改造而来, 可以显示多种视图

- 拖拽功能: 注意对于功能组织视图, 拖拽的深度有限制, 因此拖拽功能需要提供是否能放下的判断接口

- 复制粘贴功能: 同上

## 接口编辑器功能总结

接口编辑器是一个控件树, 由mt-tree组件改造而来

- diff功能
    参考vscode, diff功能由接口编辑器内置, 在每个item左侧加上竖条, 对于组织视图, 不提供改变颜色功能, 只提供更改当前修改状态的接口

- 复制粘贴功能
    每个控件项需要给一个唯一标记, 复制粘贴时剪贴板中信息加上标记头作为前缀, 保证复制无问题

- 展示功能(存疑)
    每个控件具有show属性, 展示功能下, 不具备编辑控件, 也可考虑每个控件指定一个单独的展示控件(不指定为自身)

### 控件需求

- 文本显示

- 单行文本控件
    编辑接口名称以及接口uri时使用

- 多行文本控件
    编辑注释及文档简介时使用, 考虑允许使用markdown(或者默认允许使用)

- 表头控件
    请求和回复表格的头

- 表格项控件
    功能较为复杂的复合组件, 可以选择类型, 排版上需要和父组件保持一致, 可能有必要特别处理
    只读功能: 对于mixin和公共类型, 展开子项时内容是只读的, 对于mixin, 没有删除按钮
    类型选择: 考虑select或者其他
    ?枚举类型: 对于数字和字符串可能需要具有枚举类型

- 键值对控件: 
    用于meta, headers, 可以简单添加/删除, 对于mixin, 无法删除

- 标签集合控件:
    用于mixin

### meta描述

```json
{
    "type": "控件类型",
    "children": "none" | {},
    "range"?: "数据域",
    "comment": "注释, 显示在title中",
    "name": "名称"
}
```