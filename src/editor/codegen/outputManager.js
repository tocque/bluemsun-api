import store from "../store"
import Vue from "vue"
import { mapState } from "vuex"
import { localfs } from "../fs"
import JSOutputer from "./javascript-axios"

const path = require('path')

store.registerModule('$output', {
    namespaced: true,
    state: {
        transpilers: {
            "javascript-axios": new JSOutputer()
        },
        tasks: [

        ]
    },
    getters: {
        transpilerList(state) {
            return Object.keys(state.transpilers)
        }
    },
    mutations: {
        load(state, { tasks }) {
            state.tasks = tasks
        }
    },
    actions: {
        async output({ state, rootState }, { transpiler, dest: base }) {
            return state.transpilers[transpiler].generate(rootState.data, (str, dest) => {
                console.log(path.resolve(base, dest))
                return localfs.write(path.resolve(base, dest), str);
            });
        },
        async outputAll({ state, dispatch }) {
            return Promise.all(
                state.tasks.map((task) => dispatch('output', task))
            );
        },
        async addTask({ state }, task) {
            state.tasks.push(task)
            return store.dispatch('setConfig', { 
                key: "outputTasks", value: state.tasks
            })
        },
        async editTask({ state }, { task, index }) {
            state.tasks[index] = task;
            return store.dispatch('setConfig', { 
                key: "outputTasks", value: state.tasks
            })
        }
    }
})

new Vue({
    store,
    computed: {
        ...mapState({
            work: "work"
        })
    },
    watch: {
        work(val) {
            if (val) {
                store.commit('$output/load', {
                    tasks: store.state.projectInfo.config.outputTasks
                })
            } else {

            }
        }
    }
})