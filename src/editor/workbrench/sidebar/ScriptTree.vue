<template>
    <mt-side-pane pane="scriptTree" icon="files" label="组织视图">
        <template #header>
            <div class="icon-btn" title="添加接口" @click="tryAddInterface">
                <mt-icon icon="new-file"></mt-icon>
            </div>
            <div class="icon-btn" title="添加标签" @click="addTag">
                <mt-icon icon="new-folder"></mt-icon>
            </div>
        </template>
        <div class="container">
            <el-tree :data="tree" @node-click="handleNodeClick" class="workspace-tree"
                :basePadding="15" :indent="10" node-key="id" ref="tree"
                @node-contextmenu="openMenu"
            >
                <workspace-node 
                    slot-scope="{ node, data }" :icon="data.icon" :diff="data.diff"
                    :node="node" :data="data" :title="data.comment"
                    :containDiff="data.containDiff"
                >
                    <!-- <input class="mt-input" /> -->
                    <span>{{ data.name }}</span>
                </workspace-node>
            </el-tree>
        </div>
        <context-menu ref="contextmenu"></context-menu>
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
    mounted() {
        this.$refs.contextmenu.inject([
            {
                text: "删除",
                action: async (e, id) => {
                    this.delete({ id });
                }
            },
            {
                text: "添加接口",
                action: async (e, id) => {
                    this.addInterface({ pid: id })
                }
            }
        ])
    },
    methods: {
        ...mapActions({
            editTree: "editTree",
            addTag: "addTag",
            addInterface: "addInterface",
            delete: "delete"
        }),
        handleNodeClick(data, node) {
            this.openEditor(data.id, data);
        },
        tryAddInterface() {
            this.addInterface({ pid: this.$refs.tree.getCurrentKey() })
        },
        openMenu(e, item) {
            console.log(item);
            this.$refs.contextmenu.open(e, item.id);
        },
    },
    components: {
        WorkspaceNode
    }
}
</script>

<style>
</style>
