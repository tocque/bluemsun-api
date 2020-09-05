<template>
    <div class="container form-tree">
        <el-tree :data="tree" ref="tree" :basePadding="10"
            @node-contextmenu="openMenu" node-key="field"
            :expand-on-click-node="false"
        >
            <form-node 
                slot-scope="{ node, data }" :node="node" :data="data"
            ></form-node>
        </el-tree>
    </div>
</template>

<script>
import { buildTree } from "./tree"
import FormNode from "./FormNode.vue"

export default {
    name: "form-tree",
    data() {
        return {
            tree: [],
        }
    },
    async created() {

    },
    mounted() {
    },
    methods: {
        async deleteItem(item) {
            this.commentObj
            await game.post(this.commentsrc+"/delete", item.field);
        },
        async editItem(item) {
            this.commentObj
            await game.post(this.commentsrc+"/delete", item.field);
        },
        async insertItem(item) {
            this.commentObj
            await game.post(this.commentsrc+"/delete", item.field);
        },
        update(data, comment, diff) {
            this.data = data;
            const tree = buildTree(data, comment).children;
            if (diff) this.tree = diff(tree);
            else this.tree = tree;
        },
        /** @param {MouseEvent} e */
        openMenu(e, item) {
            this.$refs.contextmenu.open(e, item);
        }
    },
    components: {
        FormNode
    }
}
</script>

<style lang="less">
.el-tree {
    // background-color: #222;
    padding: 5px 0;
    .el-tree-node {
        outline: none;
        &.is-current > .el-tree-node__content {
            background-color: var(--c-item-hl);
        }
    }
    .el-tree-node__content {
        color: var(--c-text);
        padding: 5px 10px;
        user-select: none;
        display: flex;
        align-items: center;
        .el-tree-node__expand-icon {
            margin-left: -16px;
            &.expanded {
                transform: rotate(90deg);
            }
        }
        &:hover {
            background-color: var(--c-item-hv);
        }
    }
    .el-tree__empty-block {
        display: none;
    }
    .el-tree__drop-indicator {
        background-color: var(--c-item-hl);
    }
    &.workspace-tree .el-tree-node__content {
        cursor: pointer;
    }
}
.form-tree .el-tree-node__content {
    padding: 0px;
    padding-left: 10px;
}
</style>