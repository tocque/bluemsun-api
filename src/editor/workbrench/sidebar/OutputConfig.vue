<template>
    <mt-side-pane pane="outputConfig" icon="play" label="输出">
        <template #header>
            <div class="icon-btn" title="添加输出器" @click="addTask">
                <mt-icon icon="add"></mt-icon>
            </div>
            <div class="icon-btn" title="输出全部" @click="outputAll">
                <mt-icon icon="play"></mt-icon>
            </div>
        </template>
        <div class="container">
            <mt-tabs :tabs="tasks" ref="switcher">
                <template #tab="{ tab, index }">
                    <div class="taskTab">
                        <span>{{ tab.name }}</span>
                        <div class="taskBtn">
                            <div class="icon-btn" title="配置" @click="editTask(tab, index)">
                                <mt-icon icon="gear"></mt-icon>
                            </div>
                            <div class="icon-btn" title="运行" @click="output(tab)">
                                <mt-icon icon="play"></mt-icon>
                            </div>
                        </div>
                    </div>
                </template>
            </mt-tabs>
        </div>
        <output-dialog ref="dialog"></output-dialog>
    </mt-side-pane>
</template>

<script>
import { mapState, mapActions } from "vuex"
import OutputDialog from "./OutputDialog"

export default {
    computed: {
        ...mapState('$output', {
            tasks: "tasks"
        })
    },
    methods: {
        ...mapActions('$output', {
            outputAll: "outputAll",
            _addTask: "addTask",
            _editTask: "editTask",
            output: "output"
        }),
        addTask() {
            this.$refs.dialog.open('add').then((task) => {
                if (task) {
                    this._addTask(task);
                }
            })
        },
        editTask(tab, index) {
            this.$refs.dialog.open('edit', tab).then((task) => {
                if (task) {
                    this._editTask({ index, task });
                }
            })
        }
    },
    components: {
        OutputDialog
    }
}
</script>

<style lang="less" scoped>
.taskTab {
    padding-left: 10px;
    display: flex;
}
.taskBtn {
    margin-left: auto;
    display: flex;
    .icon-btn {
        padding: 0px;
    }
}
</style>