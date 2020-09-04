<template>
    <mt-side-pane pane="scriptTree" icon="files" label="组织视图">
        <template #header>
            <div class="icon-btn" title="添加标签" @click="addTag">
                <mt-icon icon="add"></mt-icon>
            </div>
        </template>
        <div class="container">
            <el-tree :data="tree" @node-click="handleNodeClick" class="workspace-tree"
                :basePadding="15" :indent="10" node-key="id" ref="tree"
            >
                <workspace-node 
                    slot-scope="{ node, data }" icon="plug"
                    :node="node" :data="data" :title="data.comment"
                >
                    <!-- <input class="mt-input" /> -->
                    <span>{{ data.name }}</span>
                </workspace-node>
            </el-tree>
        </div>
        <div class="setting">
            <mt-icon icon="symbol-property"></mt-icon>项目配置
        </div>
    </mt-side-pane>
</template>

<script>
import WorkspaceNode from "./WorkspaceNode"
import { mapGetters, mapActions } from "vuex"

export default {
    data() {
        return {
            data: null,
        }
    },
    inject: [ "openEditor" ],
    computed: {
        ...mapGetters({
            tree: "tree"
        })
    },
    methods: {
        ...mapActions({
            editTree: "editTree",
            addTag: "addTag"
        }),
        handleNodeClick(data, node) {
            this.openEditor(data.id, data);
        }
    },
    components: {
        WorkspaceNode
    }
}
</script>

<style>
.setting {
    padding-left: 10px;
    cursor: pointer;
}
</style>
