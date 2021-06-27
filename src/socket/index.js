// const {
//     Notification
// } = require("electron")

// import {
//     ipcRenderer
// } from "electron";

export default function (userId) {
    const ws = new WebSocket("ws://182.92.225.240:8080/bluemsun/notify/" + userId);
    ws.onopen = () => {
        ws.send("发送数据");
    };
    ws.onmessage = (evt) => {
        const {
            groupName,
            username
        } = JSON.parse(evt.data).update
        let h = new Date().getHours()
        h = h < 10 ? '0' + h : h
        let m = new Date().getMinutes()
        m = m < 10 ? '0' + m : m
        let s = new Date().getSeconds()
        s = s < 10 ? '0' + s : s
        const myNotification = new window.Notification('更新通知', {
            body: `${username} 更新了${groupName}的接口文档\n${h}:${m}:${s}`,
            silent: false,
        })
        myNotification.onclick = () => {
            window.ipcRenderer.send("showMainWin")
        }
    };
}