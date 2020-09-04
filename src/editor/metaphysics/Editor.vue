<template>
    <div v-show="active" class="code-editor">
        <div class="multi-container" ref="container">
            <form-tree ref="core" @changeNode.native="onchange($event)"
            ></form-tree>
        </div>
        <status-item v-if="nostatus !== ''" v-show="active">Ln {{ line }}, Col {{col}}</status-item>
    </div>
</template>

<script>
import FormTree from "./FormTree"
import { registerSchema, getSchema } from "./schema"
import Model from './model'

export default {
    name: "code-editor",
    props: {
        "active": { default: true, type: Boolean },
        "data": { default: "data", type: String },
        "nostatus": { default: false },
        "shortcut": { default: () => [] },
    },
    data() {
        return {
            schema: "",
            model: {},
            line: 1,
            col: 1,
        }
    },
    computed: {
        comment() {
            return getSchema(this.schema);
        }
    },
    async mounted() {
        this.$regShortcut("s.ctrl", {
            action: () => this.model.save(),
            condition: () => this.active,
            prevent: true,
        })
    },
    methods: {
        setValue(value) {
            this.model.setValue(value);
        },
        getValue(value) {
            return this.model.getValue(value);
        },
        open(node, schema) {
            console.log(node);
            if (!node.model) {
                node.verison = 0;
                node.model = new Model(node[this.data], schema)
            }
            this.node = node;
            this.setModel(node.model);
        },
        setModel(model) {
            this.model = model;
            this.schema = model.schema;
            this.$refs.core.update(model.data, getSchema(model.schema));
        },
        // checkEdit(node) {
        //     const editStack = node.model._commandManager;
        //     return editStack.currentOpenStackElement ||
        //         node.verison != editStack.past.length;
        // },
        // onedit(e) {
        //     let error = 0, warn = 0;
        //     const markers = monaco.editor.getModelMarkers();
        //     for (let marker of markers) {
        //         if (marker.severity < 2) continue;
        //         else if (marker.severity < 6) warn++;
        //         else error++;
        //     }
        //     this.error = error, this.warn = warn;
        //     if (this.node) this.node.editted = this.checkEdit(this.node);
        // },
        // oncursor(e) {
        //     this.line = e.position.lineNumber, this.col = e.position.column;
        // },
        save() {
            if (this.node.editted) {
                this.node.verison = this.node.model._commandManager.past.length;
                this.node.editted = false;
                this.multi.pushUndoStop();
                this.node[this.text] = this.node.model.getValue();
                this.$emit('save', this.node);
            }
        },
        onchange() {
            this.model
        }
    },
    components: {
        FormTree
    }
}
</script>

<style>
.code-editor, .multi-container {
    height: 100%;
    background: #1E1E1E;
}
</style>