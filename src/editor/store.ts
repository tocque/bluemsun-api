/**
 * @file store.js 全局vuex store
 */
import Vue from "vue"
import Vuex from "vuex"
import { isset, clone } from './utils';
import Config from './config';
import { localfs } from './fs';

Vue.use(Vuex)

let fs = null;

interface Tag {
    id: string
    name: string
}

interface Interface {
    id: string
    tag: string
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

const models = new Map;

const calType = function(id: string) {
    return id.split(":")[0];
}

const getData = function(data: Doc, id: string) {
    const [type, vid] = id.split(":");
    switch(type) {
        case "global": {
            return data.global
        } break;
        case "tag": {
            return data.tags.find((e: Tag) => e.id == vid);
        } break;
        case "interface": {
            return data.interfaces.find((e: Interface) => e.id == vid);
        } break;
    }
    return 
}

export default new Vuex.Store({
    state: {
        url: null,
        id: "",
        work: false,
        data: {} as Doc,
        backpack: {} as Doc,
        projectInfo: null as Config | null,
        diff: {} as {[ key: string ]: string } 
    },
    getters: {
        tree(state) {
            if (!isset(state.data.interfaces)) return [];
            const tags = state.data.tags.reduce((r, v) => {
                const data = clone(v);
                delete data.id;
                r[v.id] = {
                    id: v.id,
                    data,
                    children: [],
                };
                return r;
            }, {})
            return Object.values(state.data.interfaces.reduce((r, v) => {
                r[v.tag].children.push({ data: v });
                return r;
            }, tags));
        },
        name(state) {
            return state.projectInfo?.config?.groupName
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
        setProjectInfo(state, { projectInfo }) {
            state.projectInfo = projectInfo;
        }
    },
    actions: {
        async open({ commit }, { id }: { id: string}) {
            commit("setId", { id });
            if (!localfs.isExist(`./projects/${id}`)) {
                await localfs.mkdir(`./projects/${id}/`)
                const project = await fetch(`http://182.92.225.240:8080/bluemsun/group/getJSON?groupId=${id}`)
                    .then((e) => e.json())
                    .then(({ data }) => {
                        return data.group;
                    });
                const data = await fetch(`http://182.92.225.240:8080/bluemsun/${project.jsonFile}`).then(e => e.json());
                await Promise.all([
                    // @ts-ignore
                    Config.make(`./projects/${id}/project.json`, Object.assign({}, {
                        outputTasks: []
                    }, project)),
                    localfs.write(`./projects/${id}/data.json`, JSON.stringify(data, null, 4)),
                    localfs.write(`./projects/${id}/backpack.json`, JSON.stringify(data, null, 4))
                ]);
            }
            const [projectInfo, data, backpack] = await Promise.all([
                new Config(`./projects/${id}/project.json`, {

                }).loaded,
                fetch(`./projects/${id}/data.json`).then(e => e.json()),
                fetch(`./projects/${id}/backpack.json`).then(e => e.json())
            ]);
            commit("setData", { data });
            commit("setBackpack", { backpack });
            commit("setProjectInfo", { projectInfo });
            commit("start");
        },
        async setConfig({ state }, { key, value }) {
            return state.projectInfo.set(key, value);
        },
        openEditor({ state, commit, dispatch }, { editor, id }) {
            if (!models.has(id)) {
                const model = editor.createModel(getData(state.data, id), calType(id), {
                    diff: getData(state.backpack, id)
                });
                models.set(id, model);
                model.onSave(async (data: any, diff: string) => {
                    await dispatch("change", { id, data });
                    commit("setDiff", { id, diff });
                })
            }
            editor.open(models.get(id));
        }
    }
})
