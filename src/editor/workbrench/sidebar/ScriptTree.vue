<template>
    <mt-side-pane pane="scriptTree" icon="files" label="组织视图">
        <div class="container">
            <el-tree :data="tree" @node-click="handleNodeClick" class="workspace-tree"
                :basePadding="15" :indent="10" node-key="field" ref="tree"
            >
                <workspace-node 
                    slot-scope="{ node, data }" icon="plug"
                    :node="node" :data="data" :title="data.comment"
                >{{ data.name }}</workspace-node>
            </el-tree>
        </div>
    </mt-side-pane>
</template>

<script>
import WorkspaceNode from "./WorkspaceNode"
import { mapGetters } from "vuex"

export default {
    data() {
        return {
            data: null,
        }
    },
    computed: {
        ...mapGetters("$project", {
            tree: "tree"
        })
    },
    methods: {
        handleNodeClick(data, node) {
            if (!node.isLeaf) return;
            const text = game.get("data/functions/file", data.field, "content")
            this.$emit('openTab', {
                type: "script",
                id: data.field,
                text,
                label: data.key,
                editted: false,
                icon: "javascript"
            })
        },
        async saveNode(node) {
            game.update("data/functions/file", { key: node.id, value: node.text });
        }
    },
    components: {
        WorkspaceNode
    }
}
</script>

<style>

</style>
