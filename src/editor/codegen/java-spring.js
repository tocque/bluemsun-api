export default class JAVASpringGen {
    mappintDict = {
        "GET": "GetMapping",
        "POST": "PostMapping",
        "PUT": "PutMapping",
        "DELETE": "DeleteMapping",
        "PATCH": "PatchMapping"
    }
    typeDict = {}
    name = "java-controller"
    groups = []
    generate(doc, output) {
        const groups = this.groupGenerate(doc.interfaces)
        this.groups = groups
        const controllerFiles = [...this.controllerGenerate()]
        const serviceFiles = this.serviceGenerate()
        const outputFiles = [...controllerFiles, ...serviceFiles]
        let files = {}
        // console.log(outputFiles)
        outputFiles.forEach(v => {
            files = {
                ...files,
                ...v
            }
        })
        const tasks = [];
        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                const element = files[key];
                tasks.push(output(element, key));
            }
        }
        return Promise.all(tasks);
    }
    getURIParams(uri) {
        if (/{\w+}/.test(uri)) {
            const params = [];
            uri.replace(/{(\w+)}/g, (t, v) => {
                params.push(v);
                return t;
            })
            return params
        } else {
            return [];
        }
    }
    groupGenerate(interfaces) {
        return interfaces.reduce((group, v) => {
            const name = v.uri.match(/\/(\w+)/)[1]
            if (!group.hasOwnProperty(name)) {
                group[name] = []
            }
            group[name].push(v)
            return group
        }, {})
    }
    getFormatLetter(word, tag) {
        if (tag === "upper") {
            return word.charAt(0).toUpperCase() + word.slice(1)
        } else if (tag === 'lower') {
            return word.charAt(0).toLowerCase() + word.slice(1)
        }
    }
    getSubURI(uri, groupCount) {
        let subURI;
        subURI = uri.match(/\/\w+(.*)/)[1]
        if (uri.match(/^\/\w+(\/\w+)/) === null) {
            if (groupCount === 1) {
                subURI = uri
            }
        }
        return subURI
    }
    getPreName(subURI, method) {
        let preName
        if (/^\/{/.test(subURI)) {
            preName = subURI.match(/(\/{\w+})/g)[0].replace(/{|}/g, "").replace(/\/(\w)/g, (i, v) => {
                return v.toUpperCase()
            })
            preName = this.getFormatLetter(method.toLowerCase(), "upper") + preName
        } else {
            preName = subURI.match(/(\/\w+)+/g)[0].replace(/\/(\w)/g, (i, v) => {
                return v.toUpperCase()
            })
        }
        return preName
    }
    requestMappingGenerate(k, group) {
        if (group.length === 1 && group[0].uri.match(/^\/\w+(\/\w+)/) === null) {
            return ""
        } else {
            return `@RequestMapping("/${k}")`
        }
    }
    requestGenerate(requestList, service, groupCount) {
        return requestList.reduce((content, v) => {
            const subUri = this.getSubURI(v.uri, groupCount);
            const preName = this.getPreName(subUri, v.method);
            const URIParams = this.getURIParams(v.uri).reduce((str, v) => {
                return `, @PathVariable String ${v}${str}`
            }, "")
            return `${content}
    @${this.mappintDict[v.method.toUpperCase()]}("${subUri}")
    public ${preName}RequestVo ${this.getFormatLetter(preName, "lower")}Request(@RequestBody ${preName}RequestDto ${this.getFormatLetter(preName, "lower")}RequestDto${URIParams}) {
        return ${service}.${this.getFormatLetter(preName, "lower")}RequestService(${this.getFormatLetter(preName, "lower")}RequestDto);
    }`
        }, "")
    }
    controllerGenerate() {
        return Object.entries(this.groups).map(([k, v]) => {
            const requestMapping = this.requestMappingGenerate(k, v)
            const key = `/web/${this.getFormatLetter(k, "upper")}Controller.java`
            return {
                [key]: `@CrossOrigin
@RestController
${requestMapping}
public class ${this.getFormatLetter(k, "upper")}Controller {
    @Autowired
    private ${this.getFormatLetter(k, "upper")}Service ${k}Service;
    ${this.requestGenerate(v, `${k}rService`, v.length)}
}`
            }
        })
    }
    serviceGenerate() {
        return Object.entries(this.groups).map(([k, v]) => {
            const key = `/service/${this.getFormatLetter(k, "upper")}Service.java`
            return {
                [key]: `@Service
public interface ${this.getFormatLetter(k, "upper")}Service {
    ${this.serviceMethodDef(v, v.length)}
}`
            }
        })
    }
    serviceMethodDef(v, groupCount) {
        return v.reduce((str, item) => {
            const subUri = this.getSubURI(item.uri, groupCount);
            const preName = this.getPreName(subUri, item.method);
            const URIParams = this.getURIParams(item.uri).reduce((param, paramName) => {
                return `,  String ${paramName}${param}`
            }, "")
            return `public ${preName}RequestVo  ${this.getFormatLetter(preName, "lower")}RequestService(${preName}RequestDto ${this.getFormatLetter(preName, "lower")}RequestDto${URIParams});
    ${str}`
        }, "")
    }
}