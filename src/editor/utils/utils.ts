/**
 * @file utils.ts 工具函数存放在此处
 */

export const createGuid = function (): string {
    return 'id_' + 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const HTMLescape = function (str_: string) {
    return str_.split('')
        .map((v) => '&#' + v.charCodeAt(0) + ';')
        .join('');
}

export const encode64 = function (str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}

export const decode64 = function (str: string) {
    return decodeURIComponent(atob(str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

/** 判断某对象是否不为null也不为NaN */
export const isset = function (val: any) {
    return val != undefined && val != null && !(typeof val == 'number' && isNaN(val));
}

export const exec = function (func: Function, ...args: any[]) {
    if (typeof func === "function") return func(...args);
}

/** 深拷贝一个对象 */
export const clone = function<T> (data: T): T {
    if (!isset(data)) return null;
    // date
    if (data instanceof Date) {
        // @ts-ignore
        return new Date(data);
    }
    // array
    if (Array.isArray(data)) {
        const copy = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            copy[i] = clone(data[i]);
        }
        // @ts-ignore
        return copy;
    }
    // 函数
    if (data instanceof Function) {
        return data;
    }
    // object
    if (data instanceof Object) {
        const copy: { [key: string]: any } = {};
        for (let i in data) {
            if (data.hasOwnProperty(i))
                copy[i] = clone(data[i]);
        }
        // @ts-ignore
        return copy;
    }
    return data;
}

export const checkUnique = function (thiseval: string[]) {
    if (!(thiseval instanceof Array)) return false;
    const set: {[key: string]: boolean} = {};
    for (let item of thiseval) {
        if (set[item]) {
            return false;
        }
        set[item] = true;
    }
    return true;
}

const keyCodeDict: {[key:string]: number} = {
    "backspace": 8,
    "tab": 9,
    "enter": 13,
    "shift": 16,
    "ctrl": 17,
    "alt": 18,
    "esc": 27,
    "spcae": 32,
    "pageup": 33,
    "pagedown": 34,
    "left": 37,
    "up": 38,
    "right": 39,
    "down": 40,
    "delete": 46,
};

/** 翻译键盘码 */
export const translateKeyCode = function(keyCode: string): number {
    if (keyCodeDict[keyCode]) return keyCodeDict[keyCode];
    if (keyCode.length > 1) {
        if (keyCode[0] == 'f')  { // 功能键
            const fcode = parseInt(keyCode.substr(1));
            if (fcode >= 1 && fcode <= 12) return 111 + fcode;
        }
        else if (keyCode[0] == 'k')  { // 键盘码, 为与数字区分前面需要加k
            return parseInt(keyCode.slice(1));
        }
    } else {
        const charcode = keyCode.charCodeAt(0);
        if (charcode >= 48 && charcode <= 57) return charcode; // 数字
        if (charcode >= 97 && charcode <= 122) return charcode-32; // 字母
    }
    throw new Error(keyCode+"不是合法的键盘码");
}

/** 向一个对象的所有键值对混入一个对象 */
export const batchMixin = function(obj: object, m: object) {
    const newObj = {};
    for (let e in obj) {
        newObj[e] = Object.assign({}, m, obj[e]);
    }
    return newObj;
}

export class Pos {

    x: number
    y: number

    constructor(x, y) {
        if (typeof x == 'string') {
            x = x.split(y);
            this.x = x[0], this.y = x[1];
        }
        else if (x instanceof Pos) this.x = x.x, this.y = x.y;
        else this.x = x || 0, this.y = y || 0;
    }

    /**
     * 将坐标转为网格坐标
     * @param xsize 网格宽度 
     * @param ysize 网格高度, 若不填则视为与宽度相同
     */
    gridding(xsize: number, ysize = xsize): Pos {
        return new Pos(Math.floor(this.x/xsize), Math.floor(this.y/ysize));
    }

    set(x, y) {
        if (x instanceof Pos) y = x.y, x = x.x;
        this.x = x, this.y = y;
    }

    add(x: number, y = x) {
        return new Pos(this.x + x, this.y + y);
    }

    mutli(x: number, y = x) {
        return new Pos(this.x * x, this.y * y);
    }

    /**
     * 格式化输出
     * @param separator 分隔符
     */
    format(separator: string): string {
        return this.x + separator + this.y;
    }

    copy() {
        return new Pos(this.x, this.y);
    }

    equal(p: Pos) {
        return this.x === p.x && this.y === p.y;
    }

    in(x: number, y: number, w: number, h: number) {
        return this.x >= x && this.x <= x+w 
            && this.y >= y && this.y <= y+h;
    }
}

export const mountJs = function(text: string) {
    const script = document.createElement('script');
    script.innerHTML = text;
    document.body.appendChild(script);
}

/**
 * 将aa.bb或者["aa"]["bb"]转换为数组形式
 */
export const resolvePath = function(route: string) {
    return route.startsWith('[') 
        ? route.slice(1, -1).split('][')
        : route.split(".");
}
