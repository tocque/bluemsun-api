<script>
import getInput from "./inputs.js";
import { exec } from "../utils"

export default {
    name: "form-node",
    render() {
        const comment = this.comment;
        return (
            <div class={"control-node "+this.data.diff} 
                title={ comment.comment+this.data.field }
                field={ this.data.field }
            >
                <div class={"control-content __"+this.comment.type}>
                    <span class="comment">{ comment.name }</span>
                    <div class="control-input">
                        { exec(this.inner) }
                        { this.external
                            ?  (<mt-icon 
                                class="fold-btn" 
                                onclick={ () => this.fold = !this.fold }
                                icon={'chevron-'+ (this.fold ? 'down' : 'up')}
                                title={ this.fold ? '展开' : '折叠' }
                            ></mt-icon>)
                            : void 0
                        }
                    </div>
                </div>
                { exec(this.external) }
            </div>
        );
    },
    props: ["node", "data"],
    computed: {
        showFold() {
            return ["table", "textarea"].includes(this.comment.type);
        }
    },
    data: function() {
        return {
            comment: '',
            value: '',
            fold: false,
            extra: {},
        }
    },
    created() {
        console.log(this);
        const type = this.data.comment.type;
        const _input = getInput(type);
        ["inner", "external", "defaultValidate", "init"].forEach((e) => {
            if (_input[e]) this[e] = _input[e].bind(this);
        })
        for (let i in _input.methods) {
            this[i] = _input.methods[i].bind(this);
        }
        this.comment = this.data.comment;
        if (this.init) {
            this.value = this.init(this.data.data, this.comment);
        } else {
            this.value = this.data.data;
        }
    },
    mounted() {
        if (this.comment._type == 'textarea') this.resize();
    },
    methods: {
        onchange() {
            const field = this.data.field;
            let value = this.value; 
            if (this.postProcess) {
                value = this.postProcess(this.value)
            }
            this.checkRange(this.comment, this.value).then((res) => {
                if (res) {
                    this.$el.dispatchEvent(new CustomEvent("changeNode", {
                        detail: { field, value },
                        bubbles: true,
                    }));
                } else {
                    this.$print(field + ' : 输入的值不合要求,请将鼠标放置在编辑项上查看说明', 'warn');
                }
            });
        },
        /**
         * 检查一个值是否允许被设置为当前输入
         * @param {comment} comment 
         * @param {*} thiseval 
         */
        async checkRange(comment, thiseval) {
            if (thiseval == null && comment._unrequired) return false;
            if (this.defaultValidate) {
                if (!this.defaultValidate(thiseval, this)) return false;
            }
            if (comment._range) {
                return comment._range(thiseval);
            }
            return true;
        },
    }
}
</script>

<style lang="less">
.control-node {
    padding: 5px 5px 5px 20px;
    width: 100%;
    .__meta {
        .comment {
            display: none;
        }
        .control-input {
            display: flex;
            width: 100%;
            .icon-btn {
                margin-left: auto;
            }
        }
    }
    &.modified {
        border-left: 3px solid #0c7d9d;
    }
    &.untracked {
        border-left: 3px solid #587c0c;
    }
    &.deleted {
        border-left: 3px solid #94151B;
    }
    .control-content {
        display: flex;
        justify-content: space-between;
        width: -webkit-fill-available;
    }
    select {
        width: 124px;
        background-color: #444;
        border: none;
        padding: 4px;
        color: var(--c-text);
    }
    .control-input>.mt-input {
        max-width: 240px;
        padding: 4px;
    }
    input[type="number"] {
        background-color: #444;
        border: none;
        padding: 4px;
        color: var(--c-text);
        max-width: 240px;
    }
    span.const {
        font-weight: bold;
        padding: 0px 5px;
    }
    table {
        font-size: 14px;
        width: 100%;
        margin-top: 2px;
        border-top: 1px solid;
        border-left: 1px solid;
        td {
            border-right: 1px solid;
            border-bottom: 1px solid;
            padding: 1px;
        }
    }
    .mt-textarea {
        font-size: 14px;
        background: #444444;
        resize: none;
        width: 100%;
        color: var(--c-text);
    }
    .fold-btn, .add-btn {
        cursor: pointer;
        display: none;
    }
    .add-btn {
        margin-right: 2px;
    }
    &:hover {
        .fold-btn, .add-btn {
            display: inline;
        }
    }
}
</style>