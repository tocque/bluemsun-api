/**
 * @file 生成js 前端接口的类
 */

export default class JSaxoisGen {

    typeDict = {
        "int": "number"
    }

    name = "javascript-js";

    typeGenerate(value) {
        if (typeof value === 'string') {
            return this.typeDict[value] || value;
        } else {
            switch(value.type) {
                case 'object':
                    console.log(value);
                    const props = Object.entries(value.props)
                        .map(([k, v]) => `${k}: ${this.typeGenerate(v)}`)
                        .join('\n *    ')
                    return /* js */`{
 *   ${props}
 * }`
                case 'array': 
                    return this.typeGenerate(value.subtype) + '[]';
                default: 
                    if (value.enum) {
                        return value.enum.map(JSON.stringify).join(' | ');
                    }
                    return this.typeGenerate(value.type);
            }
        }
    }

    checkURI(uri) {
        if (/{\w+}/.test(uri)) {
            const params = [];
            return ['`'+uri.replace(/{(\w+)}/g, (t, v) => {
                params.push([v, 'string', 'val in url']);
                return '$'+t;
            }) + '`', params];
        } else {
            return ['"'+uri+'"', []];
        }
    }

    codeGenerate(value) {
        const [url, lparams] = this.checkURI(value.uri);
        const params = Object.entries(value.requestParams).map(([k, v]) => {
            return [k, this.typeGenerate(v), v.comment]
        });
        return /* JS */`
/**
 * ${value.comment} ${params.map(([n, t, c]) => `\n * @param {${t}} ${n} ${c}`).join('')}
 * @return {${this.typeGenerate({ type: 'object', props: value.response })}}
 */
export function ${value.name} (${lparams.concat(params).map(([v]) => v).join(', ')}) {
    return ${"_" + value.method.toLowerCase()}(${url}, {
        headers: ${JSON.stringify(value.headers, '\t')}
    }, { ${params.map(([v]) => v).join(', ')} })
}
`
    }

    async generate(doc, output) {
        const tasks = [];
        const config = Object.assign({
            to: "request",
            header: ""
        }, doc.globals.meta[this.name] || {});
        const typeDefine = Object.entries(doc.globals.types).reduce((str, [k, v]) => {
            return str + /* js */`
/**
 * @typedef {${this.typeGenerate(v)}} ${k}
 */
            `;
        }, "");
        tasks.push(output(typeDefine, config.to+'/types.d.ts'));
        
        const tags = doc.tags.reduce((r, v) => (r[v.id] = v, r), {});
        const files = doc.interfaces.reduce((files, interf) => {
            if (!files[interf.tag]) {
                files[interf.tag] = tags[interf.tag];
                files[interf.tag].contents = [];
            }
            files[interf.tag].contents.push(this.codeGenerate(interf));
            return files;
        }, {});
        Object.values(files).forEach((file) => {
            tasks.push(output(/* JS */`
/**
 * @files ${file.filename}.js ${file.name} ${file.comment}
 */ 
${config.header}
${file.contents.join('\n')}
            `, config.to+`/${file.filename}.js`));
        });
        return Promise.all(tasks);
    }


}
