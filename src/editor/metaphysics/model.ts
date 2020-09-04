/**
 * @file model.ts 文档模型
 */

import { Schema, getSchema } from './schema';

export default class Model {

    emitters: {
        [ key: string ]: ((payload?: any) => any)[]
    } = {
        save: []
    }

    schema: string
    data: any

    constructor(data: any, schema: string) {
        this.schema = schema;
        this.data = data;
    }

    emit(event: string, payload?: any) {
        this.emitters[event].forEach(e => e(payload));
    }

    onSave(fn: (payload?: any) => any) {
        this.emitters["save"].push(fn);
    }
}