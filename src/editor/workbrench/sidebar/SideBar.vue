<template>
    <mt-side class="left" :tucked.sync="leftCollapsed">
        <script-tree active ref="scriptTree" @openTab="openTab"></script-tree>
        <project-setting></project-setting>
    </mt-side>
</template>

<script>
import ScriptTree from "./ScriptTree"
import ProjectSetting from "./ProjectSetting"

export default {
    data() {
        return {
            leftCollapsed: true
        }
    },
    methods: {
        openTab() {
            
        }
    },
    components: {
        ScriptTree, ProjectSetting
    }
}
</script>

<style>

</style>