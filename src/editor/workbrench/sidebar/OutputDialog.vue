<template>
    <mt-window :active.sync="active" :title="title" width="50%" 
        class="createMap" mask closeBtn @close="cancel()" ref="form">
        <mt-form-item label="任务名称">
            <input class="mt-input" v-model="form.name"/>
        </mt-form-item>
        <mt-form-item label="转译器">
            <mt-select :options="transpilerList" v-model="form.transpiler"></mt-select>
        </mt-form-item>
        <mt-form-item label="输出路径">
            <span>{{ form.dest }}</span>
            <div class="icon-btn" title="打开文件选择" @click="selectFile">
                <mt-icon icon="ellipsis"></mt-icon>
            </div>
        </mt-form-item>
        <template slot="foot">
            <mt-btn @click="comfirm">{{ comfirmText }}</mt-btn>
        </template>
    </mt-window>
</template>

<script>
import { isset } from '../../utils';
import { selectFile } from '../../fs';
import { mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            active: false,
            type: "",
            form: {
                name: "",
                transpiler: "",
                dest: ""
            }
        }
    },
    computed: {
        title() {
            return { add: "添加任务", edit: "编辑任务" }[this.type] 
        },
        comfirmText() {
            return { add: "确认创建", edit: "确认修改" }[this.type] 
        },
        ...mapState('$output', {
            transpilers: "transpilers"
        }),
        transpilerList() {
            return Object.keys(this.transpilers).map(e => ({ label: e, value: e}))
        }
    },
    methods: {
        selectFile() {
            selectFile("directory", ).then((dest) => {
                this.form.dest = dest;
            })
        },
        open(type, value) {
            this.type = type;
            if (value) this.form = Object.assign({}, this.form, value);
            this.active = true;
            return new Promise(res => {
                this.res = res;
            })
        },
        comfirm() {
            this.validate(this.form).then((form) => {
                this.res(form);
                this.$refs.form.close();
            }).catch((e) => {
                this.$print(e, 'warn');
            })
        },
        cancel() {
            this.res();
        },
        async validate(form) {
            return new Promise((res, rej) => {
                res(form);
            })
        }
    }
}
</script>

<style lang="less">
.mt-window {
    top: 24%;
    .mt-window__content {
        padding: 10px;
        .icon-btn {
            margin-left: auto;
        }
    }
    select {
        width: 124px;
        background-color: #444;
        border: none;
        padding: 2px;
        color: var(--c-text);
    }
}
</style>