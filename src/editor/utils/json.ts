import { resolvePath, clone } from './utils';
import { localfs } from '../fs';


type Stringifier = (s: string) => string
type event = "beforeSave" | "afterSave"

export class JsonData {

    src: string
    stringifier: Stringifier
    data: any

    /**
     * json文件的类
     * @param name 文件名称
     * @param stringifier 格式化
     */
    constructor(src: string, stringifier: Stringifier = (str => JSON.stringify(str, null, 4))) {
        this.src = src;
        this.stringifier = stringifier;
    }

    async load(url = this.src) {
        return fetch(url).then(e => e.json()).then(data => {
            this.data = data;
            return this;
        });
    }

    emmiter: { [key: string]: any } = {};

    /**
     * 访问数据域
     * @param {string} path 路径
     */
    query(path) {
        return resolvePath(path).reduce((e, key) => e[key], this.data);
    }

    queue = [];

    /**
     * 修改
     */
    modify(commands) {
        if (!(Array.isArray(commands))) commands = [commands];
        for (let { key, value } of commands) {
            if (key === "") {
                this.data = value;
            } else {
                const path = resolvePath(key);
                const name = path.pop();
                const data = path.reduce((p, e) => p[e], this.data);
                console.log(data);
                data[name] = clone(value);
            }
        }
        if (this.queue.length > 0) {
            return new Promise((res, rej) => {
                this.queue.push([res, rej]);
            })
        } else return this.save();
    }
 
    /**
     * 设置触发器, 目前提供[beforeSave] [afterSave], 传入this作为参数
     */
    addEmitter(type: event, action) {
        if (!this.emmiter[type]) this.emmiter[type] = [];
        this.emmiter[type].push(action);
    }

    emit(event: event, ...rest) {
        if (Array.isArray(this.emmiter[event])) {
            this.emmiter[event].forEach(e => e(...rest));
        }
    }

    save(queuep = 0) {
        this.emit('beforeSave', this);
        const datastr = this.stringifier(this.data);
        return new Promise((res, rej) => {
            localfs.write(this.src, datastr).then((err) => {
                if (err) {
                    if (queuep) {
                        while(queuep--) this.queue.shift()[1](err);
                    } else rej(err);
                }
                else {
                    this.emit('afterSave', this, datastr);
                    if (queuep) {
                        while(queuep--) this.queue.shift()[0](this.data);
                    } else res(this.data);
                }
                if (this.queue.length > 0) {
                    this.save(this.queue.length);
                }
            });
        });
    }
}
