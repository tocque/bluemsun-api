export default function (type) {
    switch(type) {
        case "checkbox": return {
            inner() { return (
                <mt-switch vModel={ this.value } vOn:change={ this.onchange }></mt-switch>)
            },
            validate: (v) => typeof v == 'boolean'
        }
        case "const": return {
            inner() { return (<span class="const">{ this.value }</span>) }
        }
        case "select": return {
            inner() {
                const options = this.options.map((option, i) => (
                    <option key={i} value={option}>{ option }</option>
                ));
                return (<select vModel={ this.value } vOn:change={ this.onchange }>{ options }</select>);
            },
            validate(value) { // 验证时更新选项
                if (typeof this.comment.options === "function") {
                    this.options = this.comment.options();
                }
                return this.options.includes(value);
            },
            init(data, comment) {
                if (typeof comment.options === "function") {
                    this.options = comment.options();
                } else this.options = comment.options;
                return data;
            }
        }
        case "color": return {
            inner() { 
                return (<el-color-picker 
                    show-alpha={ this.comment._alpha }
                    vModel={ this.value }
                    vOn:change={ this.onchange }
                ></el-color-picker>)
            },
            init: (data) => {
                if (Array.isArray(data)) return data.join(',');
                else return data;
            }
        }
        case "text": return { 
            inner() { 
                return (
                    <input class="mt-input" type="text" vModel={ this.value } vOn:change={ this.onchange }/>
                )
            }
        }
        case "number": return { 
            inner() { 
                return (
                    <input type="number" vModel={ this.value } vOn:change={ this.onchange }/>
                )
            }
        }
        case "event": return {
            inner() { 
                return (<mt-btn
                    mini vOn:click={ this.editEvent }
                    vOn:change={ this.onchange }
                >{ this.value ? '编辑' : '添加' }</mt-btn>) 
            },
            methods: {
                editEvent() {
                    const text = this.value ? JSON.stringify(this.value) : '';
                    this.openBlockly(text, this.comment._event).then((e) => {
                        if (e) {
                            let res = JSON.parse(e);
                            if (res.length == 0) res = void 0;
                            if (this.value != res) {
                                this.value = res;
                                this.onchange();
                            }
                        }
                    })
                }
            }
        }
        case "table": return {
            inner() {
                if (this.comment._const) return null;
                return (
                    <mt-icon 
                        class="add-btn"
                        icon="diff-added" 
                        title="新增一项"
                        vOn:click={ () => this.$refs.table.insertItem() }
                    ></mt-icon>
                )
            },
            external() {
                return (<mt-table 
                    comment={ this.comment } 
                    vModel={ this.value } 
                    style={{ display: this.fold ? "none" : "" }}
                    vOn:change={ this.onchange }
                    ref="table"
                ></mt-table>)
            }
        }
        case "textarea": return {
            external() {
                return (<textarea class="mt-textarea"
                    vModel={ this.value } 
                    style={{ display: this.fold ? "none" : "" }}
                    vOn:input={ this.resize } 
                    ref="textarea"
                    vOn:change={ this.onchange }
                ></textarea>)
            },
            methods: {       
                resize() {
                    const elm = this.$refs.textarea;
                    elm.style.height = 'auto';
                    if (elm.scrollHeight > 10) { // 特判空内容
                        elm.style.height = elm.scrollHeight+'px';
                    }
                }
            },
            init: (data) => {
                return JSON.stringify(data);
            }
        }
        case "key-value": return {
            inner() {
                return (
                    <mt-icon 
                        class="add-btn"
                        icon="diff-added" 
                        title="新增一项"
                        vOn:click={ () => this.addChild() }
                    ></mt-icon>
                )
            },
            methods: {
                addChild() {
                    const field = this.data.field + "[]", value = this.value;
                    this.$el.dispatchEvent(new CustomEvent("changeNode", {
                        detail: { field, value },
                        bubbles: true,
                    }));
                }
            }
        }
        case "meta": return {
            inner() { 
                return [
                    <input class="mt-input" type="text" vModel={ this.value } vOn:change={ this.onchange }/>,
                    ":",
                    <input class="mt-input" type="text" vModel={ this.value } vOn:change={ this.onchange }/>
                ]
            }
        }
        case "typedef": return {

        }
        case "object": return {

        }
        default: return {

        }
    }
}