<template>
    <mt-side-pane pane="sourceControl" icon="git-merge" label="版本控制">
        <template #header>
            <div class="icon-btn" title="push" @click="pushRepo">
                <mt-icon icon="repo-force-push"></mt-icon>
            </div>
        </template>
        <div class="container">
            <el-tree :data="diffList" @node-click="handleNodeClick" class="workspace-tree"
                :basePadding="15" :indent="10" node-key="id" ref="tree"
                @node-contextmenu="openMenu"
            >
                <workspace-node 
                    slot-scope="{ node, data }" icon="plug" :diff="data.diff"
                    :node="node" :data="data" :title="data.title"
                >
                    <span>{{ data.name }}</span>
                </workspace-node>
            </el-tree>
        </div>
        <context-menu ref="contextmenu"></context-menu>
        <status-item left>
            <mt-icon icon="span"></mt-icon>U: {{ diffStatus.untracked }} M: {{ diffStatus.modified }} D: {{ diffStatus.deleted }}
        </status-item>
    </mt-side-pane>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WorkspaceNode from "./WorkspaceNode"

export default {
    inject: [ "openEditor" ],
    computed: {
        ...mapGetters({
            diffList: "diffList",
            diffStatus: "diffStatus"
        })
    },
    mounted() {
        this.$refs.contextmenu.inject([
            {
                text: "取消修改",
                action: async (e, id) => {
                    this.discard(id);
                }
            },
            {
                text: "打开",
                action: async (e, id) => {
                    this.openEditor(id)
                }
            }
        ])
    },
    methods: {
        handleNodeClick(data, node) {
            this.openEditor(data.id)
        },
        ...mapActions({
            push: "push",
            discard: "discard"
        }),
        pushRepo() {
            this.$print("push到云端...");
            this.push().then(() => {
                this.$print("push完毕...");
            })
        },
        openMenu(e, item) {
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