import { Schema } from "./schema" 

let __wrongMark__ = false;

interface treenode {
    field: string
    data: any
    comment: Schema
    key: string
    children?: treenode[] 
}

/**
 * 注释对象的默认值
 */
const defaultcobj: Schema = {
    // 默认是文本域
    type: 'text',
    name: 'undefined',
    comment: '未定义在schema中的项',
    attr: {}
}

/**
 * 把来自数据文件的obj和来自*.comment.js的commentObj组装成表格
 * commentObj在无视['_data']的意义下与obj同形
 * 即: commentObj['_data']['a']['_data']['b'] 与 obj['a']['b'] 是对应的
 *     在此意义下, 两者的结构是一致的
 *     在commentObj没有被定义的obj的分支, 会取defaultcobj作为默认值
 * 因此在深度优先遍历时,维护 
 *     field="['a']['b']"
 *     vobj=obj['a']['b']
 *     cobj=commentObj['_data']['a']['_data']['b']
 * @param data 数据 
 * @param comment 注释文件
 * @returns 对象树根节点
 */
export const buildTree = function(data: any, comment: Schema): treenode {
    const root = { field: "", data, comment, key: ":root" }
    console.log(comment);
    /**
     * cobj = Object.assign({}, defaultcobj, pcobj['_data'][ii])
     * 每一项若未定义,就从defaultcobj中取
     * 当其是函数不是具体值时,把args = {
     *     field: field, vobj: vobj, cobj: cobj
     * } 代入算出该值
     * @param parent 父结点
     * @param pcomment 父结点注释域标记的子节点
     * @param key 节点属性名
     */
    const createNode = function(parent: treenode, 
        pcomment: Schema["children"],
        key: string) {
        const node = {
            field: parent.field + `[${key}]`,
            data: parent.data[key],
            key,
            comment: null
        }
        if (pcomment) {
            // cobj存在时直接取, 不存在时只取defaultcobj
            node.comment = pcomment[key] || pcomment["@default"];
        }
        if (typeof node.comment === 'string') {
            node.comment = comment.attr.types[node.comment.slice(1)];
        }
        node.comment = Object.assign({}, defaultcobj, node.comment);
        return node;
    }    
    /**
     * 深度优先遍历
     * @param parent 父结点 
     * @param pcfield 父结点的注释域
     */
    const recursionParse = function (parent: treenode) {
        console.log(parent);
        parent.children = [];
        let keysInOrder = {};
        const voidMark = {};
        const cchildren = (parent.comment || {}).children;
        // 1. 按照pcobj排序生成
        for (let ii in cchildren as {[key: string]: Schema}) {
            if (ii == "@default") continue;
            keysInOrder[ii] = voidMark;
        }
        // 2. 对每个pvobj且不在pcobj的，再添加到最后
        keysInOrder = Object.assign({}, keysInOrder, parent.data)
        for (let key in keysInOrder) {
            // 3. 对于pcobj有但是pvobj中没有的, 弹出提示, (正常情况下editor_file会补全成null)
            //    事实上能执行到这一步工程没崩掉打不开,就继续吧..
            if (keysInOrder[key] === voidMark) {
                if (!__wrongMark__) {
                    const msg = `comment和data不匹配, 失配数据域: ${parent.field}['${key}']`
                    window.onerror(msg, "tree.js");
                    __wrongMark__ = true;
                }
                parent.data[key] = null;
            }
            const node = createNode(parent, cchildren, key)
            parent.data[key] = node.data;
            // 标记为hide的属性不展示
            if (node.comment.hide) continue;
            parent.children.push(node);
            // 不是叶节点时, 插入展开的标记并继续遍历, 此处可以改成按钮用来添加新项或折叠等
            if (node.comment.children && node.comment.children.length > 0) recursionParse(node);
        }
    }
    // 开始遍历
    recursionParse(root);
    return root;
};
