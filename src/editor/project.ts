import { baseURL, afios } from "./fs"
import store from "./store"
import { isset, clone } from './utils';

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
    projectInfo: {
        title: string
    }
    globals: {
        tags: Tag[]
    }
    interfaces: Interface[]
    types: {}[]
}

store.registerModule('$project', {
    namespaced: true,
    state: {
        url: null,
        id: "",
        work: false,
        data: {} as Doc,
    },
    getters: {
        tree(state) {
            if (!isset(state.data.interfaces)) return [];
            const tags = state.data.globals.tags.reduce((r, v) => {
                r[v.id] = clone(v);
                r[v.id].children = [];
                return r;
            }, {})
            return Object.values(state.data.interfaces.reduce((r, v) => {
                r[v.tag].children.push(v);
                return r;
            }, tags));
        },
        name(state) {
            return state.data?.projectInfo?.title
        }
    },
    mutations: {
        setId(state, { id }) {
            state.id = id;
        },
        setData(state, { data }) {
            state.data = data;
        },
    },
    actions: {
        async open({ commit }, { id }: { id: string}) {
            commit("setId", { id });
            const [projectInfo, data] = await Promise.all([
                fetch(`./projects/${id}/project.json`).then(e => e.json()),
                fetch(`./projects/${id}/data.json`).then(e => e.json())
            ]);
            commit("setData", { data });
        }
    }
})
