<template>
    <div id="window">
        <header>
            <h2 id="logo">Bluemsun Api</h2>
            <mt-tabs id="topnav" :tabs="[]">
                <li><a href="https://github.com/tocque/bluemsun-api/" target="_blank">git</a></li>
            </mt-tabs>
            <p id="title">{{ projectName }} - Bluemsun Api</p>
            <div id="window-control">
                <div @click="minimize">
                    <mt-icon icon="chrome-minimize"></mt-icon>
                </div>
                <div @click="maximize">
                    <mt-icon :icon="isMax ? 'chrome-restore' : 'chrome-maximize'"></mt-icon>
                </div>
                <div @click="close" id="window-close">
                    <mt-icon icon="chrome-close"></mt-icon>
                </div>
            </div>
        </header>
        <main class="mainPanel">
            <side-bar></side-bar>
            <core-editor ref="metaphysics"></core-editor>
        </main>
        <footer id="statusBar">
            <ul ref="left" id="statusLeft">
                <status-item left :class="messageType">{{ message }}</status-item>
            </ul>
            <ul ref="right" id="statusRight"></ul>
        </footer>
    </div>
</template>

<script>
import service from "../service"
import store from "../store"
import SideBar from "./sidebar"
import CoreEditor from "../metaphysics"
import { mapState, mapGetters } from "vuex"
import Vue from "vue"

import "./dark.css"

const { ipcRenderer } = require('electron');

export default {
    data() {
        return {
            statusLeft: [],
            messageType: 'normal',
            message: '',
            statusRight: [],
            isMax: false,
        }
    },
    store,
    provide() {
        return {
            openEditor: this.openEditor,
            injectStatusItem: this.injectStatusItem
        }
    },
    computed: {
        ...mapGetters('$project', {
            projectName: 'name', // 与标题相绑定
        })
    },
    created() {
        Vue.prototype.$print = this.print.bind(this);
        Vue.prototype.$clear = this.clear.bind(this);
        ipcRenderer.on('window-maximized', (event, maxed) => this.isMax = maxed);
    },
    methods: {
        print(str = "", type = "") {
            this.message = str;
            this.messageType = type;
            if (type !== "") {
                setTimeout(() => {
                    if (this.message == str) this.print("", "");
                }, 5000);
            }
        },
        clear(value) {
            var tips = [
                '表格的文本域可以双击进行编辑',
                '双击地图可以选中素材，右键可以弹出菜单',
                '双击事件编辑器的图块可以进行长文本编辑/脚本编辑/地图选点/UI绘制预览等操作',
                'ESC或点击空白处可以自动保存当前修改',
                'H键可以打开操作帮助哦',
                'tileset贴图模式可以在地图上拖动来一次绘制一个区域；右键额外素材也可以绑定宽高',
                '可以拖动地图上的图块和事件，或按Ctrl+C, Ctrl+X和Ctrl+V进行复制，剪切和粘贴，Delete删除',
                'Alt+数字键保存图块，数字键读取保存的图块',
            ];
            if (value == null) value = Math.floor(Math.random() * tips.length);
            this.print('tips: ' + tips[value])
        },
        injectStatusItem(align, { $el }) {
            const parent = this.$refs[align];
            for (let node of parent.children) {
                if (node.dataset.priority < $el.dataset.priority) {
                    parent.insertBefore($el, node);
                    return;
                }
            }
            parent.appendChild($el);
        },
        openEditor(node, type) {
            return this.$refs.metaphysics.import(node, type);
        },
        maximize() {
            ipcRenderer.send('window-maximize');
        },
        minimize() {
            ipcRenderer.send('window-minimize');
        },
        close() {
            ipcRenderer.send('window-close');
        }
    },
    components: {
        SideBar, CoreEditor
    },
    watch: {
        projectName(value) {
            document.title = value + " - BluemsunApi";
        },
    }
}
</script>

<style lang="less">
html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    overflow: hidden;
    color: var(--c-text);
}
ul {
    user-select:none;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
:focus {
    outline: none;
}
#window {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
header {
    height: 31px;
    width: 100%;
    cursor: default;
    background-color: var(--c-top);
    box-shadow: 0px 3px 3px var(--c-shadow); 
    overflow: hidden;
    position: absolute;
    z-index: 10;
    display: flex;
    #logo {
        font-size: 14px;
        color: #007ACC;
        margin: auto 5px;
        white-space: nowrap;
    }
    #topnav {
        display: flex;
        padding-inline-start: 10px;
        flex-wrap: wrap;
        li {
            padding: 5px 12px;
            height: 21px;
            margin-inline-start: -5px;
            color: var(--c-text);
            display: inline-block;
            white-space: nowrap;
            &:hover { 
                background-color:#4E4E4E;
            }
            &.active {
                color: var(--c-text-hl);
                background-color: #535353;
            }
            a {
                color: var(--c-text);
                text-decoration: none;
            }
        }
    }
    #title {
        padding: 5px;
        margin: 0 auto;
        color: var(--c-text);
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-app-region: drag;
        font-size: 14px;
        line-height: 21px;
        user-select: none;
    }
    #window-control {
        display: flex;
        margin-left: auto;
        :hover {
            background-color: #444;
            color: var(--c-text-hl);
        }
        i.mt-icon {
            display: inline-block;
            line-height: 30px;
            height: 100%;
            width: 46px;
            font-size: 16px;
        }
        #window-close :hover {
            background-color: var(--c-close);
        }
    }
}
#statusBar {
    display: flex;
    justify-content: space-between;
    width: 98%;
    height: 27px;
    bottom: 0px;
    padding: 0 1%;
    background-color: var(--c-status);
    position: absolute;
    z-index: 10;
    color: aliceblue;
    font-size: 14px;
    .warn {
        color: #7b0101;
        font-weight: bold;
    }
    ul {
        height: 100%;
        display: flex;
        align-items: center;
    }
    #infoLeft {
        flex: 1;
    }
    #infoRight {
        margin-left: auto;
    }
}

.mainPanel {
    width: 100%;
    top: 31px;
    bottom: 27px;
    margin: 0 auto;
    display: block;
    position: absolute;
    // &.active {
    //     display: block;
    // }
}

.left, .mid, .right {
    top: 0px;
    bottom: 0px;
    position: absolute;
}

.left {
    z-index: 6;
}

.mid {
    z-index: 4;
}

.right {
    z-index: 6;
    right: 0px;
}

.main-side-layout {
    .left {
        left: 0px;
        width: 330px;
    }
    .mid {
        left: 330px;
        right: 0px;
    }
}
</style>
