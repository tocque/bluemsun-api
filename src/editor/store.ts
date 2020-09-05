/**
 * @file store.js 全局vuex store
 */
import Vue from "vue"
import Vuex from "vuex"
import { isset, clone, calDiff, getDiffType, JsonData, hex_md5 } from './utils';
import Config from './config';
import { localfs } from './fs';
import Model from './metaphysics/model';
import { get, post } from './utils/request';
import { findMex } from './utils/mex';
const http = require('http');
const fs = require('fs');

Vue.use(Vuex)

interface Tag {
    id: string
    name: string
    comment: string
    filename: string
}

interface Interface {
    id: string
    tag: string
    name: string
    comment: string
    method: string
    uri: string
    requestParams: { [key: string]: any }
    response: { [key: string]: any }
    headers: { [key: string]: string }
    meta: { [key: string]: string }
}

interface Doc {
    global: {
        title: string
        types: {}[]
        mixins: {
            [key: string]: any;
        }
    }
    tags: Tag[]
    interfaces: Interface[]
}

const models: Map<string, Model> = new Map;

const calType = function(id: string) {
    return id.split(":")[0];
}
const dict = {
    global: "global",
    tag: "tags",
    interface: "interfaces",
}
const getData = function(data: Doc, id: string) {
    const [type] = id.split(":");
    switch(type) {
        case "global":
            return data.global;
        case "tag":
            return data.tags.find((e: Tag) => e.id == id);
        case "interface":
            return data.interfaces.find((e: Interface) => e.id == id);
    }
}

let project: Config, data: JsonData, backpack: JsonData;

const BASEURL = "http://182.92.225.240:8080";

export default new Vuex.Store({
    state: {
        url: null,
        id: "",
        work: false,
        data: {} as Doc,
        backpack: {} as Doc,
        project: null as Config["config"] | null,
        diff: {} as {[ key: string ]: string },
        editNow: "" as string,
        newProj: false,
    },
    getters: {
        tree(state) {
            if (!isset(state.data.interfaces)) return [];
            const tags = state.data.tags.reduce((r, v) => {
                r[v.id] = {
                    id: v.id, name: v.name,
                    comment: v.comment, icon: "folder",
                    children: [], diff: state.diff[v.id] || "none"
                };
                return r;
            }, {})
            return Object.values(state.data.interfaces.reduce((r, v) => {
                r[v.tag].children.push({ 
                    id: v.id, name: v.name, comment: v.comment, icon: "plug",
                    diff: state.diff[v.id] || "none"
                });
                if (r[v.tag] === "none" && state.diff[v.id]) {
                    r[v.tag].containDiff = true;
                    r[v.tag] = getDiffType([r[v.tag], state.diff[v.id]]);
                }
                return r;
            }, tags)).concat({
                id: "global", name: "项目配置", icon: "symbol-property",
                diff: state.diff["global"] || "none", comment: "配置项目全局属性"
            });
        },
        name(state) {
            return state.project?.groupName
        },
        diffList(state) {
            console.log(state.diff);
            return Object.entries(state.diff).map(([id, diff]) => {
                console.log(state.data, id);
                const data = getData(state.data, id) || getData(state.backpack, id);
                console.log(data);
                return {
                    // @ts-ignore
                    id, diff, name: data.name || "项目配置", comment: data.comment || "配置项目全局属性"
                }
            });
        },
        diffStatus(state) {
            return Object.values(state.diff).reduce((r, v) => (r[v]++, r), {
                untracked: 0,
                modified: 0,
                deleted: 0,
            })
        }
    },
    mutations: {
        start(state) {
            state.work = true;
        },
        setId(state, { id }) {
            state.id = id;
        },
        setData(state, { data }) {
            state.data = data;
        },
        setBackpack(state, { backpack }) {
            state.backpack = backpack;
        },
        setProject(state, { project }) {
            state.project = project;
        },
        setDiff(state, { id, diffType }) {
            if (diffType === "none") {
                Vue.delete(state.diff, id);
            } else {
                Vue.set(state.diff, id, diffType);
            }
        },
        setEditNow(state, { id }) {
            state.editNow = id;
        },
        newProj(state, { bool }) {
            state.newProj = bool;
        },
        remove(state, { type, id }) {
            state.data[type] = state.data[type].filter((e) => e.id != id);
        }
    },
    actions: {
        async open({ commit, dispatch }, { id }: { id: string}) {
            commit("setId", { id });
            if (["project", "data", "backpack"]
                .some(e => !localfs.isExist(`./projects/${id}/${e}/json`))) {
                commit("newProj", { bool: true });
                if (!localfs.isExist(`./projects/${id}`)) {
                    await localfs.mkdir(`./projects/${id}/`);
                }
                const project = await get("/bluemsun/group/getJSON", {
                    groupId: id
                }).then(({ group }) => group); 
                if (!project.jsonFile) project.jsonFile = "/jsonStorage/newProject.json";
                const data = await new Promise((resolve) => {
                    http.get(`${BASEURL}${project.jsonFile}`, (res) => {
                        res.setEncoding('utf8');
                        let rawData = '';
                        res.on('data', (chunk) => { rawData += chunk; });
                        res.on('end', () => {
                            try {
                                const parsedData = JSON.parse(rawData);
                                resolve(parsedData);
                            } catch (e) {
                                console.error(e.message);
                            }
                        });
                    })
                })
                if (!project.md5) project.md5 = hex_md5(JSON.stringify(data, null, 4));
                await Promise.all([
                    // @ts-ignore
                    Config.make(`./projects/${id}/project.json`, Object.assign({
                        outputTasks: []
                    }, project)),
                    localfs.write(`./projects/${id}/data.json`, JSON.stringify(data, null, 4)),
                    localfs.write(`./projects/${id}/backpack.json`, JSON.stringify(data, null, 4))
                ]);
            }
            [ project, data, backpack ] = await Promise.all([
                new Config(`./projects/${id}/project.json`, {

                }).loaded,
                new JsonData(`./projects/${id}/data.json`).load(),
                new JsonData(`./projects/${id}/backpack.json`).load()
            ]);
            commit("setData", { data: data.data });
            dispatch("doDiff", { backpack: backpack.data });
            commit("setProject", { project: project.config });
            commit("start");
        },
        async push({ state, dispatch }) {
            const formData = new window.FormData();
            formData.append("groupId", project.get("groupId", ""));
            formData.append("md5", project.get("md5", ""));
            await new Promise((res) => {
                fs.readFile(`./projects/${project.get("groupId", "")}/data.json`, (err, data) => {
                    if(err) throw err;
                    formData.append("jsonFile", new File([ data ], 'data.json', { type:'application/json' }))
                    res();
                })
            })
            await post("/bluemsun/json/upload", formData);
            if (state.newProj) {
                await project.set('jsonFile', await get("/bluemsun/group/getJSON", {
                    groupId: project.get("groupId", "")
                }).then(({ group }) => group.jsonFile)); 
            }
            await backpack.modify([{ key: "", value: data.data }]);
            return dispatch("doDiff", { backpack: backpack.data });
        },
        async setConfig({ commit }, { key, value }) {
            const p = project.set(key, value);
            commit("setProject", { project: project.config });
            return p;
        },
        async change({ state, commit }, { id, value }) {
            const [ type ] = id.split(":");
            if (type === 'global') {
                await data.modify([{ key: type, value }]);
            } else {
                const _value = state.data[dict[type]].map((e) => {
                    if (e.id === id) return value;
                    else return e;
                });
                await data.modify([{ key: `[${dict[type]}]`, value: _value }]);
            }
            commit("setData", { data: data.data });
        },
        async delete({ state, commit }, { id }) {
            if (id === "global") return;
            const [ type ] = id.split(":");
            commit("remove", { type: dict[type], id });
            if (id in state.diff) {
                commit("setDiff", { id, diffType: "none" });
            } else {
                commit("setDiff", { id, diffType: "deleted" });
            }
        },
        async addTag({ state, commit }) {
            const idset = [0];
            state.data.tags.forEach((e) => {
                idset.push(parseInt(e.id.split(":")[1]));
            })
            const newid = "tag:"+(Math.max(...idset)+1);
            state.data.tags.push({
                id: newid,
                name: "新标签",
                comment: "这里是注释",
                filename: `file${newid}`
            })
            commit("setDiff", { id: newid, diffType: "untracked" });
            return state; 
        },
        async addInterface({ state, commit }, { pid }) {
            if (!pid) return;
            const [ type ] = pid.split(":");
            if (type === "global") return;
            if (type === "interface") {
                pid = state.data.interfaces.find(e => e.id === pid).tag;
            }
            const idset = [0];
            state.data.interfaces.forEach((e) => {
                idset.push(parseInt(e.id.split(":")[1]));
            })
            const newid = "interface:" + (Math.max(...idset)+1);
            state.data.interfaces.push({
                id: newid,
                name: "新接口",
                comment: "这里是注释",
                method: "GET",
                uri: "",
                tag: pid,
                requestParams: {},
                response: {},
                headers: {},
                meta: {}
            });
            commit("setDiff", { id: newid, diffType: "untracked" });
        },
        async doDiff({ state, commit }, { backpack }) {
            if (backpack) commit("setBackpack", { backpack });
            const _diff = state.backpack;
            console.log(state.data.global, _diff.global);
            if (calDiff(state.data.global, _diff.global)[1].length > 0) {
                commit("setDiff", { id: "global", diffType: "modified" });
            }
            const diffArray = function(data, diffsource) {
                const datamap: Map<string, any> = new Map;
                data.forEach((v) => {
                    datamap.set(v.id, v);
                });
                diffsource.forEach((v) => {
                    if (!datamap.has(v.id)) {
                        commit("setDiff", { id: v.id, diffType: "deleted" });
                    } else {
                        if (calDiff(datamap.get(v.id), v)[1].length > 0) {
                            commit("setDiff", { id: v.id, diffType: "modified" });
                        } else {
                            commit("setDiff", { id: v.id, diffType: "none" });
                        }
                        datamap.delete(v.id);
                    }
                });
                datamap.forEach((k) => {
                    commit("setDiff", { id: k.id, diffType: "untracked" });
                });
            }
            diffArray(state.data.tags, _diff.tags);
            diffArray(state.data.interfaces, _diff.interfaces);
        },
        async openEditor({ state, commit, dispatch }, { editor, id }) {
            if (!models.has(id)) {
                const model = editor.createModel(getData(state.data, id), calType(id), {
                    diff: getData(state.backpack, id)
                });
                models.set(id, model);
                model.on("save", async ({ data: value, model }: { data: any, model: Model}) => {
                    await dispatch("change", { id, value });
                    commit("setDiff", { id, diffType: model.diffType });
                })
            }
            commit("setEditNow", id);
            editor.setModel(models.get(id));
        }
    }
})
