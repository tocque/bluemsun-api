<template>
    <span class="workspace-node">
        <mt-icon  :icon="icon"></mt-icon>
        <slot></slot>
        <div class="label" :class="[{ contain: containDiff }, diff]"></div>
    </span>
</template>

<script>
export default {
    name: "workspace-node",
    props: ["node", "data", "icon", "diff", "containDiff"],
}
</script>

<style lang="less" scoped>
.workspace-node {
    display: flex;
    margin-left: 5px;
    width: 100%;
    .label {
        margin-left: auto;
        &::after {
            opacity: .75;
            font-size: 90%;
            font-weight: 600;
            padding: 0 16px 0 5px;
            text-align: center;
        }
        &.untracked::after {
            content: "U";
            color: rgb(115, 201, 145);
        }
        &.modified::after {
            content: "M";
            color: rgb(226, 192, 141);
        }
        &.deleted::after {
            content: "D";
            color: rgb(199, 78, 57);
        }
        &.contain::after {
            content: "●";
        }
    }
}
</style>