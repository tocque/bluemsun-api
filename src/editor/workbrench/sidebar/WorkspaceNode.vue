<template>
    <span class="workspace-node">
        <mt-icon v-if="node.isLeaf || gapIcon" 
            :icon="node.isLeaf ? icon : gapIcon"
        ></mt-icon>
        <slot></slot>
        <div class="indicator">
            <mt-icon v-if="data.unsave" icon="circle-filled"></mt-icon>
            <span v-else>{{ token }}</span>
        </div>
    </span>
</template>

<script>
export default {
    name: "workspace-node",
    props: ["node", "data", "icon", "gapIcon"],
    computed: {
        token() {
            return {
                untracked: "U",
                modified: "M",
                deleted: "D",
            }[this.data.modify] || '';
        }
    }
}
</script>

<style lang="less" scoped>
.workspace-node {
    margin-left: 5px;
}
</style>