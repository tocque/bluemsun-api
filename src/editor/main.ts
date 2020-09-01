import * as util from "./utils"
import Config from "./config"
import service from "./service"
import * as fs from "./fs"
import "./project"

import Vue from "vue"
import View from "./workbrench"

const { ipcRenderer } = require('electron');

import MtUI from "./mt-ui"
import store from './store'

Vue.use(MtUI)

const bluemsunApi = new class BluemsunApi {
    version = "0.1 pre-alpha";
    __VERSION_CODE__ = 0;

    afterload: Promise<this>

    // 仍然提供通过editor实例访问的方式
    util = util;
    service = service;
    Config = Config;
    fs = fs;

    userdata: Config;

    window: Vue;

    constructor() {
        
        this.window = new Vue({
            render: h => h(View)
        }).$mount("#app");

        // 注册控制台
        // @ts-ignore
        this.window.$regShortcut("f12", {
            action: () => ipcRenderer.send('open-devtool')
        })
        // this.afterload = this.load();
    }

    /** 加载编辑器所需的各个模块 */
    async load() {
        // [ this.userdata ] = await Promise.all([
        //     new Config("./userdata.json").loaded, 
        //     service.init()
        // ]);
        return this;
    }

    /**
     * 打开工程
     * @param id 工程id
     */
    async openProject(id: string) {
        return store.dispatch("$project/open", { id });
    }
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
    // @ts-ignore
    const string = msg.toLowerCase();
    let source = '';
    if (string.includes("script error")) {
        msg = 'Script Error: See Browser Console for Detail';
    } else {
        if (url) url = url.substring(url.lastIndexOf('/')+1);
        source = url + 'Line :' + lineNo;
        if (error) {
            source += 'Error object: ' + JSON.stringify(error)
        }
        // alert(message);
    }
    try {
        // @ts-ignore
        bluemsunApi.window.$notify.error(msg, { source });
    } catch (e) {
        alert(msg + '\n' + source);
    }
    return false;
};

// @ts-ignore
window.bluemsunApi = bluemsunApi;

bluemsunApi.openProject("XHZE46");