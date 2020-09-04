<template>
    <mt-side-pane pane="sourceControl" icon="git-merge" label="版本控制">
        <div class="container">
            <el-tree :data="diffList" @node-click="handleNodeClick" class="workspace-tree"
                :basePadding="15" :indent="10" node-key="id" ref="tree"
            >
                <workspace-node 
                    slot-scope="{ node, data }" icon="plug"
                    :node="node" :data="data" :title="data.title"
                >
                    <span>{{ data.name }}</span>
                </workspace-node>
            </el-tree>
        </div>
    </mt-side-pane>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    inject: [ "openEditor" ],
    computed: {
        ...mapGetters({
            diffList: "diffList"
        })
    },
    methods: {
        handleNodeClick(data, node) {
            this.openEditor(data.id)
        }
    }
}
</script>

<style>

</style>