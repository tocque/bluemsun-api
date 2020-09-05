/**
 * @file model.ts 文档模型
 */

import { Schema, getSchema } from './schema';
import { CommandStack } from './commandstack';
import { isset, calDiff, diffType, getDiffType, resolvePath, clone } from '../utils';

type modelEvent = "save" | "edit"

export default class Model {

    emitters: {
        [ key in modelEvent ]: ((payload?: any) => any)[]
    } = {
        save: [],
        edit: [],
    }

    schema: string
    _data: any
    data: any
    diff: any
    diffs: [string, string][]
    commandStack = new CommandStack()
    diffType: diffType

    constructor(data: any, schema: string, options: { diff?: any } = {}) {
        this.schema = schema;
        this._data = clone(data);
        if (isset(options.diff)) {
            this.diff = options.diff;
        } else this.diffType = "untracked";
        this.doDiff();
        this.commandStack.register("change", ({ field, value, type }) => {
            const path = resolvePath(field);
            const key = path.pop();
            const obj = path.reduce((e, v) => e[v], this._data);
            const data = obj[key];
            console.log(field, value);
            if (type === "rename") {
                obj[value] = obj[key];
                delete obj[key];
            } else if (type === "delete") {
                delete obj[key];
            } else {
                obj[key] = value;
            }
            return { field, value: data, type };
        }, ({ field, value }) => {
            const path = resolvePath(field);
            const key = path.pop();
            path.reduce((e, v) => e[v], this._data)[key] = value;
        })
    }

    doDiff() {
        console.log(this._data);
        if (isset(this.diff)) {
            console.log(this.diff, this._data);
            [ this.data, this.diffs ] = calDiff(this._data, this.diff);
            if (this.diffs.length > 0) this.diffType = "modified";
            else this.diffType = "none";
        } else {
            this.data = this._data;
        }
    }

    renderDiff(tree) {
        if (isset(this.diff)) {
            const attachDiff = (treeNow: any[]) => {
                let outDiff = "none";
                treeNow.forEach((e) => {
                    e.diff = this.diffs.find(([field]) => field === e.field)?.[1] || "none";
                    if (e.children && e.children.length > 0) {
                        e.diff = getDiffType([e.diff, attachDiff(e.children)]);
                    }
                    outDiff = getDiffType([outDiff, e.diff]);
                })
                return outDiff;
            }
            attachDiff(tree);
            return tree;
        } else {
            return tree;
        }
    }

    edit({ field, value }) {
        this.commandStack.push("change", { field, value });
        this.doDiff();
        this.emit("edit", { field, value, model: this });
    }

    undo() {
        this.commandStack.undo();
        this.doDiff();
        this.emit("edit", { model: this });
    }

    redo() {
        this.commandStack.redo();
        this.doDiff();
        this.emit("edit", { model: this });
    }

    canUndo() {
        return this.commandStack.hasBack();
    }

    canRedo() {
        return this.commandStack.hasNext();
    }

    save() {
        this.emit("save", { data: this._data, model: this });
    }

    emit(event: modelEvent, payload?: any) {
        this.emitters[event].forEach(e => e(payload));
    }

    on(event: modelEvent, fn: (payload?: any) => any) {
        this.emitters[event].push(fn);
    }
}