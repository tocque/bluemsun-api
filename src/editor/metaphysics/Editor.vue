<template>
    <div v-show="active" class="code-editor">
        <div class="multi-container" ref="container">
            <form-tree ref="core" @changeNode.native="onchange($event)"
            ></form-tree>
        </div>
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
            action: () => this.model?.save(),
            condition: () => this.active,
            prevent: true,
        })
        this.$regShortcut("z.ctrl", {
            action: () => this.model?.undo(),
            condition: () => this.active && this.model?.canUndo(),
            prevent: true,
        })
        this.$regShortcut("y.ctrl", {
            action: () => this.model?.redo(),
            condition: () => this.active && this.model?.canRedo(),
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
        createModel(data, type, options) {
            const model = new Model(data, type, options);
            model.on("edit", () => {
                if (this.model != model) return;
                console.log(this.$refs);
                this.$refs.core.update(model.data, getSchema(model.schema), (data) => model.renderDiff(data));
            })
            return model;
        },
        setModel(model) {
            this.model = model;
            this.schema = model.schema;
            this.$refs.core.update(model.data, getSchema(model.schema), (data) => model.renderDiff(data));
        },
        // checkEdit(node) {
        //     const editStack = node.model._commandManager;
        //     return editStack.currentOpenStackElement ||
        //         node.verison != editStack.past.length;
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
        onchange({ detail: { field, value, type } }) {
            this.model.edit({ field, value, type });
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