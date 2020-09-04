<template>
    <mt-side :tucked="tucked" @update:tucked="(e) => $emit('update:tucked', e)">
        <script-tree active ref="scriptTree" @openTab="openTab"></script-tree>
        <source-control></source-control>
        <output-config></output-config>
    </mt-side>
</template>

<script>
import ScriptTree from "./ScriptTree"
import SourceControl from "./SourceControl"
import OutputConfig from "./OutputConfig" 

export default {
    props: {
        tucked: { type: Boolean }
    },
    data() {
        return {
        }
    },
    methods: {
        openTab() {
            
        }
    },
    components: {
        ScriptTree, SourceControl, OutputConfig
    }
}
</script>

<style>

</style>